from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from utils.preprocess import preprocess_image
from utils.response_handler import success_response, error_response

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load('models/model_skin_tone_classification.pkl')
class_names = ['olive', 'light', 'dark']  # Urutkan sesuai model

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    image_bytes = image_file.read()
    features = preprocess_image(image_bytes)

    probabilities = model.predict_proba(features)[0]
    prediction = model.predict(features)[0]
    confidence = float(np.max(probabilities))

    # Buat dictionary probabilitas untuk semua kelas
    probability_dict = {
        class_names[i]: round(float(prob), 2)
        for i, prob in enumerate(probabilities)
    }

    response_data = {
        'prediction': class_names[prediction],
        'confidence': round(confidence, 2),
        'probabilities': probability_dict
    }

    return success_response(data=response_data)

if __name__ == '__main__':
    app.run(debug=True)