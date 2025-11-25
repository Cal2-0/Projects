
import cv2
import time
from utils.config import WINDOW_NAME, VIDEO_SOURCE, HEATMAP_ALPHA
from utils.video_loader import VideoLoader
from utils.drawing import draw_text, overlay_heatmap
from detectors.yolo_tracker import YOLOTracker
from heatmap.heatmap_updater import HeatmapUpdater
from heatmap.danger_zone_detector import DangerZoneDetector

from detectors.doorway_counter import DoorwayCounter

def main():
    print("Initializing MassEd.ex System...")
    
    # Initialize modules
    loader = VideoLoader(VIDEO_SOURCE)
    tracker = YOLOTracker()
    heatmap_updater = HeatmapUpdater()
    zone_detector = DangerZoneDetector()
    
    # Initialize Doorway Counter (Default: Vertical line in the middle)
    # Adjust these points based on your actual camera setup
    doorway_line = [(320, 0), (320, 480)] 
    doorway_counter = DoorwayCounter(doorway_line)
    
    print("System Ready. Starting Loop...")
    
    while True:
        start_time = time.time()
        
        # 1. Get Frame
        frame = loader.get_frame()
        if frame is None:
            print("End of video stream.")
            break
            
        # 2. Track People
        results, positions, current_count, unique_count = tracker.detect_and_track(frame)
        
        # 3. Update Heatmap
        heatmap_updater.update(positions)
        heatmap_color = heatmap_updater.get_heatmap_image()
        
        # 4. Analyze Danger Zones
        # We pass the raw accumulator for analysis, not the color image
        raw_accum = heatmap_updater.get_raw_accum()
        zone_statuses, global_status, grid_overlay = zone_detector.analyze(raw_accum)
        
        # 5. Update Doorway Counter
        # We need to pass (id, cx, cy) which is exactly what 'positions' contains
        doorway_counter.update(positions)
        
        # 6. Visualization
        # Overlay heatmap
        display_frame = overlay_heatmap(frame, heatmap_color, alpha=HEATMAP_ALPHA)
        
        # Overlay grid and zones
        # We add the grid overlay on top
        display_frame = cv2.addWeighted(display_frame, 1.0, grid_overlay, 0.6, 0)
        
        # Draw tracks
        for (tid, cx, cy) in positions:
            cv2.circle(display_frame, (cx, cy), 5, (0, 255, 0), -1)
            cv2.putText(display_frame, f"ID:{tid}", (cx, cy - 10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
            
        # Draw Doorway Counter Overlay
        display_frame = doorway_counter.draw(display_frame)
            
        # Draw HUD
        draw_text(display_frame, f"Count: {current_count}", (20, 40))
        draw_text(display_frame, f"Total Seen: {unique_count}", (20, 80))
        
        status_color = (0, 255, 0)
        if global_status == "WARNING": status_color = (0, 255, 255)
        if global_status == "DANGER": status_color = (0, 0, 255)
        
        draw_text(display_frame, f"Status: {global_status}", (20, 120), color=status_color)
        
        # 7. Display
        cv2.imshow(WINDOW_NAME, display_frame)
        
        # 7. Logging (Console)
        print(f"Count: {current_count} | Total: {unique_count} | Status: {global_status}")
        
        # FPS Control
        fps = 1.0 / (time.time() - start_time)
        # print(f"FPS: {fps:.2f}")
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
            
    loader.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
