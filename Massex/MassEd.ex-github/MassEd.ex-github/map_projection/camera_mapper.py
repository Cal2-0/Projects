import cv2
import numpy as np
import json
import os

class CameraMapper:
    def __init__(self, map_image, config_path="camera_config.json"):
        self.map_image = map_image.copy()
        self.display_image = map_image.copy()
        self.config_path = config_path
        self.points = []
        self.camera_mappings = self.load_config()
        self.current_camera_id = f"camera_{len(self.camera_mappings) + 1}"
        self.window_name = "Camera Mapper"

    def load_config(self):
        if os.path.exists(self.config_path):
            with open(self.config_path, 'r') as f:
                return json.load(f)
        return {}

    def save_config(self):
        with open(self.config_path, 'w') as f:
            json.dump(self.camera_mappings, f, indent=4)
        print(f"Configuration saved to {self.config_path}")

    def mouse_callback(self, event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            if len(self.points) < 4:
                self.points.append((x, y))
                print(f"Point selected: {x}, {y}")
                self.update_display()

    def update_display(self):
        self.display_image = self.map_image.copy()
        
        # Draw existing mappings
        for cam_id, data in self.camera_mappings.items():
            pts = np.array(data['polygon'], np.int32)
            pts = pts.reshape((-1, 1, 2))
            cv2.polylines(self.display_image, [pts], True, (0, 255, 0), 2)
            # Draw label
            center = np.mean(pts, axis=0).astype(int)[0]
            cv2.putText(self.display_image, cam_id, tuple(center), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Draw current points
        for pt in self.points:
            cv2.circle(self.display_image, pt, 5, (0, 0, 255), -1)

        if len(self.points) > 1:
            cv2.polylines(self.display_image, [np.array(self.points)], False, (0, 0, 255), 2)
        
        if len(self.points) == 4:
            # Close the loop for visualization
            cv2.line(self.display_image, self.points[-1], self.points[0], (0, 0, 255), 2)
            
        cv2.imshow(self.window_name, self.display_image)

    def run(self):
        cv2.namedWindow(self.window_name)
        cv2.setMouseCallback(self.window_name, self.mouse_callback)
        
        print(f"Mapping mode for {self.current_camera_id}")
        print("Click 4 points to define the camera region.")
        print("Press 's' to save the current region.")
        print("Press 'c' to clear current points.")
        print("Press 'q' to quit.")

        self.update_display()

        while True:
            key = cv2.waitKey(1) & 0xFF

            if key == ord('s'):
                if len(self.points) == 4:
                    self.camera_mappings[self.current_camera_id] = {
                        "polygon": self.points
                    }
                    print(f"Saved mapping for {self.current_camera_id}")
                    self.save_config()
                    self.points = []
                    self.current_camera_id = f"camera_{len(self.camera_mappings) + 1}"
                    print(f"Ready for {self.current_camera_id}")
                    self.update_display()
                else:
                    print("Error: Need exactly 4 points to save.")

            elif key == ord('c'):
                self.points = []
                print("Cleared points.")
                self.update_display()

            elif key == ord('q'):
                break

        cv2.destroyAllWindows()

if __name__ == "__main__":
    # Test the mapper
    from map_loader import load_map
    img = load_map("venue_map.png", target_width=800)
    if img is not None:
        mapper = CameraMapper(img)
        mapper.run()
