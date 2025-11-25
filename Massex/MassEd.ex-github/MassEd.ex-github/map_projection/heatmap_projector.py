import cv2
import numpy as np

class HeatmapProjector:
    def __init__(self, map_shape):
        """
        Initialize with the shape of the target map (height, width).
        """
        self.map_h, self.map_w = map_shape[:2]

    def compute_transform(self, src_points, dst_points):
        """
        Computes the perspective transform matrix.
        src_points: List of 4 points [(x,y), ...] from the camera view (usually corners).
        dst_points: List of 4 points [(x,y), ...] on the map (from CameraMapper).
        """
        src_pts = np.float32(src_points)
        dst_pts = np.float32(dst_points)
        matrix = cv2.getPerspectiveTransform(src_pts, dst_pts)
        return matrix

    def project_heatmap(self, heatmap, matrix):
        """
        Warps the heatmap using the perspective matrix to fit the map.
        Returns an image of the same size as the map, with the heatmap placed correctly.
        """
        # Warp the heatmap
        warped_heatmap = cv2.warpPerspective(heatmap, matrix, (self.map_w, self.map_h))
        return warped_heatmap

    def get_default_source_points(self, heatmap_shape):
        """
        Returns the 4 corners of the heatmap image as source points.
        Order: Top-Left, Top-Right, Bottom-Right, Bottom-Left
        """
        h, w = heatmap_shape[:2]
        return [(0, 0), (w, 0), (w, h), (0, h)]

if __name__ == "__main__":
    # Test the projector
    map_w, map_h = 800, 600
    projector = HeatmapProjector((map_h, map_w))
    
    # Create a dummy heatmap (red square)
    heatmap = np.zeros((100, 100, 3), dtype=np.uint8)
    heatmap[:] = (0, 0, 255)
    
    # Define destination points (a trapezoid in the center of the map)
    dst_points = [(200, 200), (600, 200), (700, 500), (100, 500)]
    
    # Get source points
    src_points = projector.get_default_source_points(heatmap.shape)
    
    # Compute matrix
    matrix = projector.compute_transform(src_points, dst_points)
    
    # Project
    warped = projector.project_heatmap(heatmap, matrix)
    
    cv2.imshow("Warped Heatmap", warped)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
