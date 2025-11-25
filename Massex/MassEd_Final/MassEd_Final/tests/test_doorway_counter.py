import cv2
import numpy as np
import time
from detectors.doorway_counter import DoorwayCounter

def test_doorway_counter():
    print("Testing Doorway Counter...")
    
    # Create a dummy frame
    width, height = 640, 480
    
    # Define a vertical line in the middle
    line_points = [(320, 0), (320, 480)]
    counter = DoorwayCounter(line_points)
    
    # Simulate a person moving from Left (x < 320) to Right (x > 320) -> EXIT (based on our logic)
    # Let's verify the direction logic:
    # Line P1(320, 0) -> P2(320, 480)
    # Vector P1->P2 is (0, 480) (Down)
    # "Left" of Down is Right side of image (positive x). Wait.
    # Cross product: (B-A) x (C-A)
    # (0, 480) x (dx, dy) = 0*dy - 480*dx = -480*dx
    # If C is to the left (x < 320), dx is negative, result is positive.
    # If C is to the right (x > 320), dx is positive, result is negative.
    
    # So:
    # Left side (x < 320) -> Positive (CCW)
    # Right side (x > 320) -> Negative (CW)
    
    # Movement:
    # Left -> Right: Pos -> Neg. Logic says: "If moving from Left (pos) to Right (neg) -> EXIT"
    # Right -> Left: Neg -> Pos. Logic says: "If moving from Right (neg) to Left (pos) -> ENTER"
    
    # So Left->Right is Exit, Right->Left is Enter.
    
    # Let's simulate ID 1 moving Left -> Right (Exit)
    # Let's simulate ID 2 moving Right -> Left (Enter)
    
    tracks = [
        # ID 1: 100 -> 400 (Crosses 320)
        (1, 100, 240),
        (1, 150, 240),
        (1, 200, 240),
        (1, 250, 240),
        (1, 300, 240), # Just before
        (1, 350, 240), # Just after -> Should trigger EXIT
        (1, 400, 240),
        
        # ID 2: 500 -> 200 (Crosses 320)
        (2, 500, 300),
        (2, 450, 300),
        (2, 400, 300),
        (2, 350, 300), # Just before
        (2, 250, 300), # Just after -> Should trigger ENTER
        (2, 200, 300),
    ]
    
    # Process frame by frame (simulated)
    for i, (tid, x, y) in enumerate(tracks):
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        
        # Feed detection to counter
        # Note: In real life, we might have multiple IDs per frame.
        # Here we simulate one ID moving at a time for simplicity of the loop, 
        # but let's group them if we want. 
        # Actually, let's just feed one at a time and see if it works (it should, as it tracks by ID).
        
        detections = [(tid, x, y)]
        counter.update(detections)
        
        # Draw
        frame = counter.draw(frame)
        
        # Draw the person
        cv2.circle(frame, (x, y), 10, (255, 0, 0), -1)
        cv2.putText(frame, f"ID {tid}", (x, y-15), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        cv2.imshow("Doorway Test", frame)
        
        counts = counter.get_counts()
        print(f"Step {i}: ID {tid} at ({x}, {y}) -> Counts: {counts}")
        
        key = cv2.waitKey(100)
        if key == ord('q'):
            break
            
    print("Final Counts:", counter.get_counts())
    
    # Expected: Enter=1, Exit=1
    if counter.enter_count == 1 and counter.exit_count == 1:
        print("TEST PASSED")
    else:
        print("TEST FAILED")
        
    cv2.destroyAllWindows()

if __name__ == "__main__":
    test_doorway_counter()
