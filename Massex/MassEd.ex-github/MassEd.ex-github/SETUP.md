# Setup Guide for MassEd.ex

## Quick Start

### 1. Clone or Download the Repository
If you received this as a folder, you're ready to go. If it's on GitHub:
```bash
git clone <repository-url>
cd MassEd.ex
```

### 2. Create a Virtual Environment (Recommended)
```bash
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux
# OR
venv\Scripts\activate  # On Windows
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

The first time you run the system, YOLOv8n model will be automatically downloaded.

### 4. Run the Application
```bash
python main.py
```

Press `q` to quit the application.

## Configuration

Edit `utils/config.py` to customize:
- Video source (webcam or video file)
- Heatmap parameters
- Danger zone thresholds
- Visualization colors

## Troubleshooting

### Camera not working?
- Make sure your webcam is connected and not being used by another application
- Try changing `VIDEO_SOURCE` in `utils/config.py` to a different camera index (0, 1, 2, etc.)

### Dependencies not installing?
- Make sure you have Python 3.8 or higher: `python3 --version`
- Try upgrading pip: `pip install --upgrade pip`

### Performance issues?
- YOLOv8n is optimized for CPU, but performance depends on your hardware
- Try reducing the video resolution in `utils/config.py`
- Close other applications to free up resources

## Project Structure

```
MassEd.ex/
├── detectors/          # People detection and tracking
├── heatmap/           # Heatmap generation and danger zones
├── area_measure/      # Area measurement tool
├── map_projection/    # Map projection system
├── utils/             # Configuration and utilities
├── tests/             # Test files
├── main.py            # Main application entry point
├── venue_monitor.py   # Venue monitoring system
└── requirements.txt   # Python dependencies
```

## Contributing

Feel free to submit issues and pull requests!

## License

This project is open source and available under the MIT License.
