import cv2
import numpy as np
import time
import os

from utils.config import VIDEO_SOURCE
from utils.video_loader import VideoLoader
from detectors.yolo_tracker import YOLOTracker
from heatmap.heatmap_updater import HeatmapUpdater
from heatmap.danger_zone_detector import DangerZoneDetector
from detectors.doorway_counter import DoorwayCounter
from utils.logger import DataLogger

class VenueMonitor:
    def __init__(self, venue_layout_path):
        self.venue_layout = cv2.imread(venue_layout_path)
        if self.venue_layout is None:
            raise ValueError(f"Could not load venue layout from {venue_layout_path}")
        
        self.venue_h, self.venue_w = self.venue_layout.shape[:2]
        print(f"Venue layout loaded: {self.venue_w}x{self.venue_h}")
        
        # Gate line points (will be set interactively)
        self.gate_line = None
        self.gate_points = []
        
    def select_gate_line(self):
        """Interactive gate line selection"""
        print("\n=== GATE LINE SELECTION ===")
        print("Click TWO points to define the entry/exit gate line")
        print("Press 'r' to reset, 'q' to finish")
        
        clone = self.venue_layout.copy()
        
        def mouse_callback(event, x, y, flags, param):
            if event == cv2.EVENT_LBUTTONDOWN:
                if len(self.gate_points) < 2:
                    self.gate_points.append((x, y))
                    cv2.circle(clone, (x, y), 5, (0, 0, 255), -1)
                    
                    if len(self.gate_points) == 2:
                        cv2.line(clone, self.gate_points[0], self.gate_points[1], (0, 255, 0), 3)
                        print(f"Gate line defined: {self.gate_points[0]} -> {self.gate_points[1]}")
                    
                    cv2.imshow("Select Gate Line", clone)
        
        cv2.namedWindow("Select Gate Line")
        cv2.setMouseCallback("Select Gate Line", mouse_callback)
        
        while True:
            cv2.imshow("Select Gate Line", clone)
            key = cv2.waitKey(1) & 0xFF
            
            if key == ord('r'):
                self.gate_points = []
                clone = self.venue_layout.copy()
                print("Reset. Click two points again.")
            elif key == ord('q'):
                if len(self.gate_points) == 2:
                    self.gate_line = self.gate_points
                    break
                else:
                    print("Please select 2 points before quitting!")
        
        cv2.destroyWindow("Select Gate Line")
        print(f"Gate line set: {self.gate_line}\n")
    
    def run(self):
        """Main monitoring loop"""
        print("Initializing monitoring system...")
        
        # Initialize components
        loader = VideoLoader(VIDEO_SOURCE)
        tracker = YOLOTracker()
        heatmap_updater = HeatmapUpdater()
        zone_detector = DangerZoneDetector()
        logger = DataLogger(filename="venue_session_log.csv")
        
        # Initialize doorway counter with the gate line
        if self.gate_line:
            doorway_counter = DoorwayCounter(self.gate_line)
        else:
            print("WARNING: No gate line defined. Skipping doorway counting.")
            doorway_counter = None
        
        print("System ready. Starting monitoring...")
        print("Press 'q' to quit\n")
        
        while True:
            start_time = time.time()
            
            # 1. Get frame from camera
            frame = loader.get_frame()
            if frame is None:
                print("End of video stream.")
                break
            
            cam_h, cam_w = frame.shape[:2]
            
            # 2. Track people
            results, positions, current_count, unique_count = tracker.detect_and_track(frame)
            
            # 3. Update heatmap (in camera coordinates)
            heatmap_updater.update(positions)
            heatmap_gray = heatmap_updater.get_raw_accum()
            
            # 4. Map positions to venue coordinates
            venue_positions = []
            for (tid, cx, cy) in positions:
                vx = int((cx / cam_w) * self.venue_w)
                vy = int((cy / cam_h) * self.venue_h)
                venue_positions.append((tid, vx, vy))
            
            # 5. Update doorway counter (in venue coordinates)
            if doorway_counter:
                doorway_counter.update(venue_positions)
                doorway_counts = doorway_counter.get_counts()
            else:
                doorway_counts = {'enter': 0, 'exit': 0, 'inside': 0}
            
            # 6. Analyze danger zones
            zone_statuses, global_status, grid_overlay = zone_detector.analyze(heatmap_gray)
            
            # 7. Log data
            logger.log(unique_count, current_count, doorway_counts['enter'], doorway_counts['exit'], global_status)
            
            # 8. Visualization
            # Start with venue layout
            display = self.venue_layout.copy()
            
            # Resize heatmap to venue size
            heatmap_color = heatmap_updater.get_heatmap_image()
            heatmap_resized = cv2.resize(heatmap_color, (self.venue_w, self.venue_h))
            
            # Overlay heatmap
            display = cv2.addWeighted(display, 0.6, heatmap_resized, 0.4, 0)
            
            # Resize and overlay danger grid
            grid_resized = cv2.resize(grid_overlay, (self.venue_w, self.venue_h))
            display = cv2.addWeighted(display, 1.0, grid_resized, 0.3, 0)
            
            # Draw tracked people on venue
            for (tid, vx, vy) in venue_positions:
                cv2.circle(display, (vx, vy), 3, (0, 255, 0), -1)
                cv2.putText(display, f"{tid}", (vx, vy-5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 0), 1)
            
            # Draw gate line and counts
            if self.gate_line:
                cv2.line(display, self.gate_line[0], self.gate_line[1], (0, 255, 255), 3)
                mid_x = (self.gate_line[0][0] + self.gate_line[1][0]) // 2
                mid_y = (self.gate_line[0][1] + self.gate_line[1][1]) // 2
                
                # Gate stats
                gate_text = f"IN:{doorway_counts['enter']} OUT:{doorway_counts['exit']} INSIDE:{doorway_counts['inside']}"
                cv2.rectangle(display, (mid_x-100, mid_y-30), (mid_x+100, mid_y+10), (0, 0, 0), -1)
                cv2.putText(display, gate_text, (mid_x-90, mid_y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 1)
            
            # Dashboard overlay
            self._draw_dashboard(display, unique_count, current_count, doorway_counts, global_status)
            
            # Display
            cv2.imshow("Venue Monitor", display)
            
            # Console output
            print(f"Count: {current_count} | Total: {unique_count} | IN: {doorway_counts['enter']} | OUT: {doorway_counts['exit']} | Status: {global_status}")
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        loader.release()
        cv2.destroyAllWindows()
        print("\nMonitoring stopped.")
    
    def _draw_dashboard(self, frame, total, current, gate_counts, status):
        """Draw dashboard overlay"""
        h, w = frame.shape[:2]
        
        # Semi-transparent top bar
        overlay = frame.copy()
        cv2.rectangle(overlay, (0, 0), (w, 60), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)
        
        # Title
        cv2.putText(frame, "VENUE MONITOR", (20, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        
        # Metrics
        x = 250
        gap = 110
        
        cv2.putText(frame, f"TOTAL: {total}", (x, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
        cv2.putText(frame, f"CURRENT: {current}", (x + gap, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
        cv2.putText(frame, f"IN: {gate_counts['enter']}", (x + gap*2, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 1)
        cv2.putText(frame, f"OUT: {gate_counts['exit']}", (x + gap*3, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 100, 255), 1)
        
        # Status
        s_color = (0, 255, 0) if status == "SAFE" else (0, 255, 255) if status == "WARNING" else (0, 0, 255)
        cv2.putText(frame, f"STATUS: {status}", (x + gap*4, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, s_color, 2)

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    venue_layout_path = os.path.join(script_dir, "venue_layout.png")
    
    if not os.path.exists(venue_layout_path):
        print(f"ERROR: Venue layout not found at {venue_layout_path}")
        return
    
    monitor = VenueMonitor(venue_layout_path)
    
    # Interactive gate selection
    monitor.select_gate_line()
    
    # Start monitoring
    monitor.run()

if __name__ == "__main__":
    main()
