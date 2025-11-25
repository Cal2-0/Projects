from flask import Flask, render_template, request, jsonify, url_for
import os
from werkzeug.utils import secure_filename
from PIL import Image
import torch
from transformers import CLIPProcessor, CLIPModel

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Load CLIP model once
device = "cuda" if torch.cuda.is_available() else "cpu"
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device)
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Candidate product labels
candidate_labels = ["smartphone", "laptop", "headphones", "bag", "watch", "book", "bottle"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    file.save(filepath)

    # Open image and run CLIP
    image = Image.open(filepath).convert("RGB")
    inputs = clip_processor(text=candidate_labels, images=image, return_tensors="pt", padding=True).to(device)
    outputs = clip_model(**inputs)
    probs = outputs.logits_per_image.softmax(dim=1)
    best_idx = probs.argmax().item()
    recognized_label = candidate_labels[best_idx]

    # Return JSON with image URL and recognized label
    return jsonify({
        'image_url': url_for('static', filename=f'uploads/{filename}'),
        'recognized_label': recognized_label
    })

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)
