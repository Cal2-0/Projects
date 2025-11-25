
import cv2
import numpy as np
import math

class AreaMeasureApp:
    def __init__(self, image_path=None):
        self.points = []
        self.image_path = image_path
        self.image = None
        self.clone = None
        
    def load_image(self):
        if self.image_path:
            self.image = cv2.imread(self.image_path)
        
        if self.image is None:
            # Create a blank image if no path or load failed
            self.image = np.zeros((720, 1280, 3), dtype=np.uint8)
            cv2.putText(self.image, "No Image Loaded. Drag & Drop or provide path.", 
                        (50, 360), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            
        self.clone = self.image.copy()

    def click_event(self, event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            self.points.append((x, y))
            self.update_display()

    def calculate_metrics(self):
        if len(self.points) < 3:
            return 0.0, 0.0
        
        # Perimeter
        perimeter = 0.0
        for i in range(len(self.points)):
            p1 = self.points[i]
            p2 = self.points[(i + 1) % len(self.points)]
            dist = math.sqrt((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2)
            perimeter += dist
            
        # Area (Shoelace formula)
        area = 0.0
        for i in range(len(self.points)):
            j = (i + 1) % len(self.points)
            area += self.points[i][0] * self.points[j][1]
            area -= self.points[j][0] * self.points[i][1]
        area = abs(area) / 2.0
        
        return area, perimeter

    def update_display(self):
        temp_img = self.clone.copy()
        
        # Draw points and lines
        if len(self.points) > 0:
            # Draw points
            for p in self.points:
                cv2.circle(temp_img, p, 5, (0, 0, 255), -1)
            
            # Draw lines
            if len(self.points) > 1:
                cv2.polylines(temp_img, [np.array(self.points)], False, (0, 255, 0), 2)
                
            # Close loop if > 2 points (preview)
            if len(self.points) > 2:
                cv2.line(temp_img, self.points[-1], self.points[0], (0, 255, 0), 1)
                
                area, perimeter = self.calculate_metrics()
                
                # Overlay results
                cv2.putText(temp_img, f"Area: {area:.2f} px^2", (20, 40), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2)
                cv2.putText(temp_img, f"Perimeter: {perimeter:.2f} px", (20, 70), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2)

        cv2.imshow("Area Measurement", temp_img)

    def run(self):
        self.load_image()
        cv2.namedWindow("Area Measurement")
        cv2.setMouseCallback("Area Measurement", self.click_event)
        
        self.update_display()
        
        print("Controls:")
        print("  Click to add points")
        print("  'c' to clear points")
        print("  'q' to quit")
        
        while True:
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == ord('c'):
                self.points = []
                self.update_display()
                
        cv2.destroyAllWindows()

if __name__ == "__main__":
    # Test run
    app = AreaMeasureApp()
    app.run()
