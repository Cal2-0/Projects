# Multi-Project Showcase

This repo is a personal playground that collects many small-to-medium builds—AI prototypes, data apps, creative tooling, and frontend experiments. Each folder is a self-contained project; some are production-ready, others are prototypes you can riff on.

## Getting Started

- **Clone & navigate**
  ```bash
  git clone <repo-url>
  cd Projects
  ```
- **Python apps**: create an isolated environment, install requirements, run the entry script.
  ```bash
  python -m venv .venv
  .\.venv\Scripts\activate
  pip install -r <project>/requirements.txt
  python <entry_point>.py
  ```
- **Node/Static apps**: enter the folder and install dependencies (if package files exist) or simply open the HTML files in a browser.
  ```bash
  cd Massex
  npm install
  npm run dev
  ```

Most projects expose a `README.md`, `requirements.txt`, or obvious entry script—start there for specifics.

## Directory Tour

| Folder | Stack | What it does | Entry point |
| --- | --- | --- | --- |
| `ai.co` | Flask + OpenRouter APIs | Launchpad for three mini-apps: `AICHAT` (chatbot), `MOVAI` (AI movie concierge), and `HOLI` (AI trip planner). | `app.py` |
| `chating/acc app` | Flask-SocketIO | Password-protected rooms with real-time messaging via websockets. | `server.py` |
| `ciphers` | Flask + vanilla JS | Learning lab for classical ciphers (Caesar, Vigenère, Atbash, Bacon, ROT13) with themed templates. | `cipher.py` |
| `fintera/ko` | Static HTML/CSS/JS | Finance experience with SIP/EMI calculators, tax tips, stock cards, and modal components. | `index.html` in each subfolder |
| `healthcompass` | Static HTML dashboard | Futuristic health-analytics control center with mock metrics, cards, and animations. | `index.html` |
| `Massex/MassEd_Final` | Python CV stack (YOLOv8, ByteTrack, OpenCV) | Full crowd analytics suite: person tracking, heatmaps, danger-zone detection, and area measurement tooling. | `main.py` (plus `area_measure/measure_app.py`) |
| `metadata` | Flask + Pillow + EXIF | “Melkit” image metadata extractor with GPS parsing and glassmorphism UI. | `network.py` |
| `movie` | Flask + MySQL + TMDB API | “Movieszbt” movie manager; guests share a database, registered users get isolated tables with TMDB imports. | `app.py` |
| `ouchmybrain` | Flask + AI APIs + Tailwind | AI study companion that turns uploads into summaries, flashcards, podcasts, and adaptive study plans. | `app.py` |
| `Pic editor` | Flask + Pillow + NumPy | Browser-based photo studio featuring dozens of filters, channels, and download support. | `app.py` |
| `PicSerach` | Flask + CLIP | “SnapShop” visual shopping assistant—upload a photo, CLIP classifies it and returns matching product cards. | `network.py` |
| `Universal.st` | Flask + yt_dlp + Pillow | Multi-tool (“Universal Studio”) with YouTube metadata/downloader and lightweight photo editor. | `uni.py` |

Other folders (e.g., `Massex/MassEd.ex-github`, `Pic editor/templates`, `metadata/uploads`) hold assets, backups, or deployment artifacts referenced by the main apps.

## Suggested Next Steps

- Add screenshots/GIFs to each folder to show the UI polish.
- Wire up a root landing page (e.g., Vite/Next) that links to every app running on separate ports.
- Containerize the heavier Flask apps (`ai.co`, `PicSerach`, `Massex`) for easy previews.
- Use a consistent `.env.example` across projects to document API keys and secrets.

Have fun exploring—this repo is meant to feel like a creative lab. Dive into any folder, tweak, and redeploy.

