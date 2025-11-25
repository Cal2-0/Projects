
# MassEd.ex

A modular crowd analysis system featuring people tracking, heatmap generation, danger zone detection, and area measurement.

## Features

1.  **People Detection & Tracking**: Real-time tracking using YOLOv8 and ByteTrack.
2.  **Heatmap Generator**: Dynamic heatmap visualization based on accumulated crowd positions.
3.  **Danger Zone Detector**: Grid-based safety analysis (Safe/Warning/Danger).
4.  **Area Measurement**: Standalone tool for measuring area and perimeter of regions.

## Installation (Mac)

1.  **Prerequisites**: Ensure you have Python 3.8+ installed.

2.  **Create a Virtual Environment** (Recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

### 1. Run the Main System (Tracking + Heatmap + Danger Zones)

```bash
python main.py
```
*   Press `q` to quit.
*   By default, it uses the webcam. To use a video file, edit `utils/config.py` and set `VIDEO_SOURCE` to the file path.

### 2. Run the Area Measurement Tool

```bash
python area_measure/measure_app.py
```
*   **Click** to add points.
*   **c** to clear.
*   **q** to quit.
*   To load a specific image, you can modify the code or pass it in `measure_app.py` (currently defaults to a blank canvas if no path provided).

## Configuration

Edit `utils/config.py` to adjust:
*   **Video Source**: Webcam ID or file path.
*   **Heatmap**: Decay rate, blob size, intensity.
*   **Danger Zones**: Grid size, thresholds.
*   **Colors**: Visualization colors.

## Folder Structure

*   `detectors/`: YOLOv8 tracking logic.
*   `heatmap/`: Heatmap and danger zone analysis.
*   `area_measure/`: Measurement tool.
*   `utils/`: Configuration and helper functions.
*   `main.py`: Main entry point.

## Credits

Inspired by [Crowd-Analysis](https://github.com/lewjiayi/Crowd-Analysis), rebuilt with modern YOLOv8 and modular architecture.
