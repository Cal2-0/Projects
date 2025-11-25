
import cv2
from .config import COLOR_TEXT

def draw_text(img, text, pos, color=COLOR_TEXT, scale=0.6, thickness=2):
    x, y = pos
    cv2.putText(img, text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, scale, (0, 0, 0), thickness + 2)
    cv2.putText(img, text, (x, y), cv2.FONT_HERSHEY_SIMPLEX, scale, color, thickness)

def draw_bbox(img, box, label=None, color=(0, 255, 0)):
    x1, y1, x2, y2 = map(int, box)
    cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
    if label:
        draw_text(img, label, (x1, y1 - 10), color=color)

def overlay_heatmap(frame, heatmap_color, alpha=0.6):
    return cv2.addWeighted(heatmap_color, alpha, frame, 1 - alpha, 0)
