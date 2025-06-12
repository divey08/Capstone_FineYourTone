# FineYourTone - Skin Tone Detection & Color Recommendations

## About The Project

FineYourTone is an innovative web application designed to detect users' skin tones and provide color recommendations that perfectly match their complexion. This project was developed as part of the Dicoding Camp Capstone Project, powered by DBS Foundation.

### Key Features

- **Skin Tone Detection**: Upload your photo and we'll analyze your skin tone
- **Personalized Color Recommendations**: Get color recommendations that complement your skin tone
- **Explore Skintones**: Learn about different undertones and how they affect color choices
- **About Us**: A section explaining who the developers are, the purpose of this project, and more
- **User Feedback System**: Share your experience to help us improve our service

## Technology Stack

### Backend

- Python 3.11.8+
- Flask (REST API Framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- TensorFlow (AI Model for skin tone classification)
- Pillow & OpenCV (Image Processing)
- NumPy (Numerical Operations)
- Railway (Cloud deployment platform)

### Frontend

- Vue.js 3 (JavaScript Framework)
- Vue Router (Routing)
- Vite (Build Tool)
- Supabase (Backend as a Service)
- Axios (HTTP Client)
- AOS (Animate on Scroll) - for scroll animations
- GSAP (GreenSock Animation Platform) - for complex animations
- Animate.css - for component animations
- PWA (Progressive Web App) support

## Project Structure

```
Capstone_FineYourTone/
├── flask-backend/                # Flask backend source code
│   ├── models/                   # AI model files
│   │   └── model_skin_tone_classification...
│   ├── utils/                    # Helper utilities
│   │   ├── preprocess.py         # Image preprocessing
│   │   └── response_handler.py   # Response formatter
│   ├── notebook.ipynb            # Notebook Jupyter
│   ├── app.py                    # Main Flask application
│   ├── requirements.txt          # Python dependencies
│   ├── Procfile                  # Deployment configuration
│   ├── README.md                 # Backend documentation
│   └── .gitignore                # Git ignore rules
│
├── vue-frontend/                 # Vue frontend code
│   ├── public/                   # Static assets
│   ├── src/                      # Vue application code
│   ├── styles/                   # Global styles
│   ├── package.json              # Project dependencies
│   ├── vite.config.js            # Vite build configuration
│   └── README.md                 # Frontend documentation
│
├── requirements.txt              # Project-wide dependencies
└── README.md                     # Main documentation (this file)
```

## Installation & Setup

### Prerequisites

- Python 3.11.8 or higher
- Node.js 14.x or higher
- npm or yarn

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Capstone_FineYourTone.git
cd Capstone_FineYourTone/flask-backend
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Run the backend server:

```bash
python app.py
```

The Flask backend will be available at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the Vue frontend directory

```bash
cd vue-frontend
```

2. Install Node.js dependencies

```bash
npm install
# or
yarn
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:5173`.

## Usage Guide

1. **Home Page**: Learn about the application and its features
2. **Testing**: Upload your photo to detect your skin tone
3. **Explore Undertones**: Learn about different undertones and matching colors
4. **About Us**: A section explaining who the developers are, the purpose of this project, and more
5. **User Feedback**: Share your experience with the application

## How It Works

1. Users upload a photo through the web interface
2. Our AI model (based on Faster R-CNN) processes the image to identify skin regions
3. The model analyzes the skin tone
4. Based on the detected skin tone, the application provides personalized color recommendations

## Offline Development (PWA)

This application supports Progressive Web App (PWA) features that enable:

- Installation on devices as a native app
- Access to certain content without an internet connection
- Faster experience after the first visit

## Acknowledgements

- Dicoding Academy for the learning platform and mentorship
- DBS Foundation for supporting this initiative
- All team members who contributed to this project

&copy; 2025 FineYourTone.
