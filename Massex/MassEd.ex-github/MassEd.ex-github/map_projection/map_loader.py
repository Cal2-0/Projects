import cv2
import numpy as np
import os

def create_placeholder_map(path, width=800, height=600):
    """
    Generates a simple placeholder map image if the file is missing.
    Draws a basic layout with a "Stage" and "Entrance" area.
    """
    print(f"Creating placeholder map at {path}...")
    
    # Create a dark gray background
    image = np.zeros((height, width, 3), dtype=np.uint8)
    image[:] = (30, 30, 30)  # Dark gray
    
    # Draw "Stage" area (Top center)
    cv2.rectangle(image, (width//2 - 100, 50), (width//2 + 100, 150), (100, 100, 255), -1)
    cv2.putText(image, "STAGE", (width//2 - 40, 110), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    
    # Draw "Entrance" area (Bottom center)
    cv2.rectangle(image, (width//2 - 80, height - 100), (width//2 + 80, height), (100, 255, 100), -1)
    cv2.putText(image, "ENTRANCE", (width//2 - 70, height - 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)
    
    # Draw some "Zones" or "Barriers"
    cv2.rectangle(image, (50, 200), (200, 400), (80, 80, 80), 2)
    cv2.putText(image, "Zone A", (70, 300), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 200, 200), 1)
    
    cv2.rectangle(image, (width - 200, 200), (width - 50, 400), (80, 80, 80), 2)
    cv2.putText(image, "Zone B", (width - 180, 300), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 200, 200), 1)
    
    # Save the image
    cv2.imwrite(path, image)
    return image

def load_map(path, target_width=None):
    """
    Loads the map image from the given path.
    If the file does not exist, creates a placeholder.
    Optionally resizes the map to a target width while maintaining aspect ratio.
    """
    if not os.path.exists(path):
        print(f"Map file not found: {path}")
        # Create a placeholder if it doesn't exist
        image = create_placeholder_map(path)
    else:
        image = cv2.imread(path)
        if image is None:
            print(f"Error: Could not read image at {path}")
            return None

    if target_width:
        image = resize_map(image, target_width)
        
    return image

def resize_map(image, target_width):
    """
    Resizes the image to the target width, maintaining aspect ratio.
    """
    h, w = image.shape[:2]
    aspect_ratio = h / w
    target_height = int(target_width * aspect_ratio)
    resized_image = cv2.resize(image, (target_width, target_height))
    return resized_image

if __name__ == "__main__":
    # Test the loader
    test_path = "venue_map_test.png"
    img = load_map(test_path, target_width=800)
    if img is not None:
        cv2.imshow("Loaded Map", img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        # Clean up test file
        if os.path.exists(test_path):
            os.remove(test_path)
