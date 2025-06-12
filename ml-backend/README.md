# FineYourTone - Machine Learning Backend

## About the Project
FineYourTone is an innovative web application designed to detect a user's skin tone and provide personalized color recommendations that match their complexion perfectly. This project was developed as part of the Dicoding Camp Capstone Project, powered by DBS Foundation.

## Key Features
- API for skin tone classification based on images
- Prediction of three skin tone categories: light, olive, and dark
- Response with class prediction and confidence level

## Technologies Used
- **Python 3.8+**
- **Flask**: Web framework for building REST API
- **Scikit-learn**: Machine learning library for classification models
- **Pillow (PIL)**: Image processing
- **NumPy**: Numerical computing
- **Joblib**: Machine learning model serialization
- **Gunicorn**: WSGI HTTP Server for deployment

## How to Run the Application

### Prerequisites
- Python 3.8 or newer
- pip (Python package manager)

### Installation Steps

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/Capstone_FineYourTone.git
   cd Capstone_FineYourTone/ml-backend
   ```

2. Create and activate a virtual environment (optional but recommended)
   ```bash
   python -m venv venv
   # For Windows
   venv\Scripts\activate
   # For Linux/Mac
   source venv/bin/activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application
   ```bash
   # For development
   python app.py
   
   # For production using gunicorn
   gunicorn app:app
   ```

5. The application will run at `http://localhost:5000`

## API Usage

### Skin Tone Prediction Endpoint
- **URL**: `/predict`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameter**: 
  - `image`: image file (JPG/PNG)

### Example Request (using curl)
```bash
curl -X POST -F "image=@path/to/your/image.jpg" http://localhost:5000/predict
```

### Example Response
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "prediction": "olive",
    "confidence": 0.85,
    "probabilities": {
      "olive": 0.85,
      "light": 0.10,
      "dark": 0.05
    }
  }
}
```

## Project Structure
```
ml-backend/
├── app.py                  # Main Flask application
├── Procfile                # Configuration for deployment (e.g., Heroku)
├── README.md               # Project documentation
├── requirements.txt        # List of dependencies
├── models/
│   └── model_skin_tone_classification.pkl  # Trained ML model
└── utils/
    ├── preprocess.py       # Image preprocessing functions
    └── response_handler.py # API response format handler
```

## Libraries Used
- **Flask**: Web framework for Python
- **Flask-CORS**: Flask extension for handling CORS
- **Joblib**: Machine learning model serialization
- **NumPy**: Numerical computing for Python
- **Pillow (PIL)**: Image processing library
- **Scikit-learn**: Machine learning library
- **Gunicorn**: WSGI HTTP server for deployment
- **Python-dotenv**: Environment variable management


## License
© 2025 FineYourTone Team - A Dicoding Camp Capstone Project powered by DBS Foundation.