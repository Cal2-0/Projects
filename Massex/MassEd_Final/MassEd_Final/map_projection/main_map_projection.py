import cv2
import numpy as np
import time
import os
import json

# Import our modules
from map_loader import load_map
from camera_mapper import CameraMapper
from heatmap_projector import HeatmapProjector
from overlay_utils import blend_overlays, apply_colormap, draw_zones

def generate_simulated_heatmap(shape, t):
    """
    Generates a dummy heatmap with moving blobs for demonstration.
    shape: (h, w)
    t: time factor for movement
    """
    h, w = shape[:2]
    heatmap = np.zeros((h, w), dtype=np.uint8)
    
    # Moving blob 1
    cx1 = int(w/2 + (w/3) * np.sin(t))
    cy1 = int(h/2 + (h/3) * np.cos(t))
    cv2.circle(heatmap, (cx1, cy1), 40, 255, -1)
    
    # Moving blob 2
    cx2 = int(w/2 + (w/4) * np.cos(t*1.5))
    cy2 = int(h/2 + (h/4) * np.sin(t*1.5))
    cv2.circle(heatmap, (cx2, cy2), 30, 200, -1)
    
    # Apply blur to make it "heat-like"
    heatmap = cv2.GaussianBlur(heatmap, (51, 51), 0)
    
    return heatmap

def main():
    print("Starting Map Projection System...")
    
    # 1. Load Map
    # Look for map in current directory or the same directory as the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    map_path = os.path.join(script_dir, "venue_map.png")
    
    venue_map = load_map(map_path, target_width=1000)
    if venue_map is None:
        print(f"Failed to load map from {map_path}")
        return

    map_h, map_w = venue_map.shape[:2]
    print(f"Map loaded: {map_w}x{map_h}")

    # 2. Load or Create Camera Mappings
    config_path = os.path.join(script_dir, "camera_config.json")
    if not os.path.exists(config_path):
        print("No camera configuration found. Starting mapping mode...")
        mapper = CameraMapper(venue_map, config_path)
        mapper.run()
        
    # Reload config to be sure
    with open(config_path, 'r') as f:
        camera_mappings = json.load(f)
        
    if not camera_mappings:
        print("No cameras mapped. Exiting.")
        return

    print(f"Loaded mappings for {len(camera_mappings)} cameras.")

    # 3. Initialize Projector
    projector = HeatmapProjector((map_h, map_w))

    # 4. Main Loop
    print("Starting projection loop. Press 'q' to quit.")
    
    start_time = time.time()
    
    while True:
        t = time.time() - start_time
        
        projected_overlays = []
        
        for cam_id, data in camera_mappings.items():
            # A. Use the layout image itself as the camera input (as per user request)
            # We resize it to a standard camera size or keep it as is. Let's keep it as is for clarity.
            cam_heatmap_color = venue_map.copy()
            
            # B. Get transform matrix
            dst_points = data['polygon']
            # Source points are now the corners of the layout image itself
            src_points = projector.get_default_source_points(cam_heatmap_color.shape)
            matrix = projector.compute_transform(src_points, dst_points)
            
            # C. Project to map
            warped_heatmap = projector.project_heatmap(cam_heatmap_color, matrix)
            projected_overlays.append(warped_heatmap)

        # 5. Blend and Display
        final_view = blend_overlays(venue_map, projected_overlays, alpha=0.7)
        
        # Draw zones on top for reference
        final_view = draw_zones(final_view, camera_mappings)
        
        cv2.imshow("Venue Heatmap Overlay", final_view)
        
        if cv2.waitKey(30) & 0xFF == ord('q'):
            break

    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
