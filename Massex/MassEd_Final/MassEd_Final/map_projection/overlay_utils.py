import cv2
import numpy as np

def apply_colormap(heatmap_gray):
    """
    Applies the JET colormap to a grayscale heatmap.
    heatmap_gray: 2D numpy array (0-255).
    """
    return cv2.applyColorMap(heatmap_gray, cv2.COLORMAP_JET)

def blend_overlays(base_map, overlays, alpha=0.6):
    """
    Blends multiple projected heatmaps onto the base map.
    base_map: The venue map image (BGR).
    overlays: List of projected heatmap images (BGR, same size as base_map).
    alpha: Transparency factor for the heatmaps.
    """
    # Start with the base map
    final_map = base_map.copy()
    
    # Accumulate all overlays
    # A simple approach is to max-blend them or average them.
    # For heatmaps, max-blend usually looks better to preserve "hot" spots.
    
    combined_overlay = np.zeros_like(base_map)
    
    for overlay in overlays:
        # Assumes overlay is black (0,0,0) where there is no heat
        combined_overlay = np.maximum(combined_overlay, overlay)
        
    # Create a mask where the overlay has content
    mask = np.any(combined_overlay > 0, axis=2)
    
    # Blend only where there is content
    final_map[mask] = cv2.addWeighted(base_map[mask], 1 - alpha, combined_overlay[mask], alpha, 0)
    
    return final_map

def draw_zones(image, camera_mappings):
    """
    Draws the camera region boundaries on the map for visualization.
    """
    vis_image = image.copy()
    for cam_id, data in camera_mappings.items():
        pts = np.array(data['polygon'], np.int32)
        pts = pts.reshape((-1, 1, 2))
        cv2.polylines(vis_image, [pts], True, (255, 255, 255), 1, cv2.LINE_AA)
        
        # Draw label
        center = np.mean(pts, axis=0).astype(int)[0]
        cv2.putText(vis_image, cam_id, tuple(center), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255), 1)
        
    return vis_image

if __name__ == "__main__":
    # Test utils
    base = np.zeros((400, 400, 3), dtype=np.uint8)
    base[:] = (100, 100, 100)
    
    overlay1 = np.zeros_like(base)
    cv2.circle(overlay1, (100, 100), 50, (0, 0, 255), -1) # Red blob
    
    overlay2 = np.zeros_like(base)
    cv2.circle(overlay2, (200, 200), 60, (0, 255, 0), -1) # Green blob
    
    blended = blend_overlays(base, [overlay1, overlay2])
    
    cv2.imshow("Blended", blended)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
