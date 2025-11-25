
# MassEd.ex Implementation Walkthrough

I have successfully built the **MassEd.ex** system, a modular crowd analysis platform.

## 📂 System Architecture

I created the following modular structure:

*   **`MassEd.ex/`**: Root directory.
    *   **`detectors/yolo_tracker.py`**: Handles people detection and tracking using **YOLOv8** and **ByteTrack**. It outputs unique IDs and positions.
    *   **`heatmap/heatmap_updater.py`**: Generates a real-time heatmap using Gaussian blobs with accumulation and decay logic.
    *   **`heatmap/danger_zone_detector.py`**: Divides the frame into a grid and classifies zones as **SAFE**, **WARNING**, or **DANGER** based on heat density.
    *   **`area_measure/measure_app.py`**: A standalone tool for measuring area and perimeter of polygons on an image.
    *   **`utils/`**: Contains configuration (`config.py`), video loading (`video_loader.py`), and drawing helpers (`drawing.py`).
    *   **`main.py`**: The central orchestrator that runs the pipeline: **Detect -> Track -> Heatmap -> Zone Analysis -> Visualize**.

## 🚀 Key Features Implemented

1.  **Modern Tracking**: Replaced the old YOLOv4+DeepSORT with **YOLOv8n + ByteTrack** for better performance on Mac CPUs.
2.  **Dynamic Heatmap**: Implemented a decay-based heatmap that highlights active areas and fades inactive ones.
3.  **Zone Safety**: Added logic to automatically classify grid zones based on crowd density.
4.  **Measurement Tool**: Created a robust area measurement script with a GUI.

## 🛠️ How to Run

1.  **Install Dependencies**:
    ```bash
    cd MassEd.ex
    pip install -r requirements.txt
    ```

2.  **Run Main System**:
    ```bash
    python main.py
    ```

3.  **Run Measurement Tool**:
    ```bash
    python area_measure/measure_app.py
    ```

## ⚙️ Configuration

You can tweak the system in `utils/config.py`:
*   **`VIDEO_SOURCE`**: Set to `0` for webcam or a file path (e.g., `"video.mp4"`).
*   **`DECAY_FACTOR`**: Controls how fast the heatmap fades.
*   **`GRID_ROWS/COLS`**: Adjust the danger zone grid size.
