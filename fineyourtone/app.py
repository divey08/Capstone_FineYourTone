import torch
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageDraw, ImageFont
import torchvision
from torchvision import transforms
from torchvision.models.detection import FasterRCNN
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
import os
from models import db, Feedback

# Inisialisasi Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///feedback.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# Label yang akan digunakan
LABELS = {
    1: "background",
    2: "dark skin",
    3: "fair skin",
    4: "light skin",
    5: "medium skin",
    6: "skin"
}

# Path ke model yang sudah dilatih
model_path = "fasterrcnn_model.pth"  # Gantilah path ini sesuai lokasi model Anda

def get_model(model_path, num_classes):
    """
    Memuat dan menyesuaikan model Faster R-CNN untuk mendeteksi num_classes dari file .pth.
    model_path: Path ke file model .pth
    num_classes: Jumlah kelas yang diinginkan (termasuk background).
    """
    # Memuat model Faster R-CNN dengan backbone ResNet50 FPN
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=False)
    
    # Mengganti prediktor dengan jumlah kelas yang sesuai
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    # Memuat bobot model yang sudah dilatih dari file
    model.load_state_dict(torch.load(model_path))
    
    # Set model ke mode evaluasi
    model.eval()
    
    return model

# Mengonfigurasi transformasi gambar
transform = transforms.Compose([
    transforms.ToTensor(),  # Mengubah gambar menjadi tensor
])

# Fungsi untuk memproses gambar dan prediksi
def predict(image_path, model):
    # Baca gambar
    image = Image.open(image_path).convert("RGB")
    image_tensor = transform(image).unsqueeze(0)  # Tambahkan dimensi batch

    # Prediksi menggunakan model Faster R-CNN
    with torch.no_grad():
        prediction = model(image_tensor)
    
    return image, prediction

# Fungsi untuk menggambar bounding box pada gambar dan mengembalikan label terdeteksi
def draw_boxes(image, prediction, threshold=0.5):
    draw = ImageDraw.Draw(image)
    boxes = prediction[0]['boxes']
    labels = prediction[0]['labels']
    scores = prediction[0]['scores']
    
    detected_labels = {}  # Menyimpan label yang terdeteksi dengan skor tertinggi
    
    # Menambahkan font jika tersedia
    try:
        font = ImageFont.truetype("arial.ttf", 15)
    except IOError:
        font = ImageFont.load_default()

    for box, label, score in zip(boxes, labels, scores):
        label_name = LABELS.get(label.item(), 'Unknown')  # Ambil nama label dari dictionary LABELS
        if label_name not in detected_labels or detected_labels[label_name] < score.item():
            detected_labels[label_name] = score.item()
        if score > threshold:
            # Gambarkan bounding box
            draw.rectangle(list(box), outline="blue", width=3)
            # Gambarkan label dan skor
            draw.text((box[0], box[1]), f"{label_name}: {score:.2f}", fill="blue", font=font)

    return image, detected_labels  # Mengembalikan gambar dan daftar label terdeteksi


# Mengambil model Faster R-CNN dengan 6 kelas
model = get_model(model_path, 6)

# Route untuk landing page (Halaman utama yang pertama kali dibuka)
@app.route("/")
def landing():
    return render_template("landingpage.html")

# Route untuk halaman upload dan prediksi (URL /index)
@app.route("/index", methods=['GET', 'POST'])
def main():
    return render_template("index.html")

@app.route("/predict", methods=['POST'])
def predict_image():
    if request.method == 'POST':
        img = request.files['my_image']
        img_filename = img.filename
        img_path = os.path.join("static", img_filename)
        img.save(img_path)

        # Prediksi dan gambar bounding box
        image, prediction = predict(img_path, model)
        image_with_boxes, detected_labels = draw_boxes(image, prediction)

        # Menyimpan gambar hasil prediksi
        output_image_path = os.path.join("static", f"predicted_{img_filename}")
        image_with_boxes.save(output_image_path)

        # Check if the request wants JSON or HTML
        if request.headers.get('Accept') == 'application/json':
            return jsonify({
                "img_path": f"predicted_{img_filename}",
                "detected_labels": detected_labels
            })
        else:
            # Render template with img_path and detected_labels for the HTML version
            return render_template("index.html", img_path=f"predicted_{img_filename}", detected_labels=detected_labels)

@app.route("/api/feedback", methods=['GET', 'POST'])
def handle_feedback():
    if request.method == 'POST':
        try:
            data = request.json
            feedback = Feedback(
                name=data['name'],
                email=data['email'],
                rating=data['rating'],
                category=data['category'],
                message=data['message']
            )
            db.session.add(feedback)
            db.session.commit()
            return jsonify(feedback.to_dict()), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
            
    # GET method
    feedbacks = Feedback.query.order_by(Feedback.date.desc()).all()
    return jsonify([f.to_dict() for f in feedbacks])

# Jalankan Flask
if __name__ == "__main__":
    app.run(debug=True)
