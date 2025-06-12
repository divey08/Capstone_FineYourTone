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
- Python 3.x
- Flask (Web Framework)
- Flask-SQLAlchemy (ORM Database)
- Flask-CORS (Cross-Origin Resource Sharing)
- PyTorch & TorchVision (AI Model for skin tone detection)
- Pillow & OpenCV (Image Processing)
- NumPy (Array Operations)
- Gunicorn (WSGI Server for production)

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
├── requirements.txt               # Python dependencies for backend
├── README.md                      # Project documentation
│
├── vue-frontend/                  # Vue frontend directory
│   ├── public/                    # Static assets
│   │   ├── favicon.ico           # Website icon
│   │   ├── manifest.json         # PWA configuration
│   │   ├── offline.html          # Offline page
│   │   └── img/                  # Images and other assets
│   │       └── icons/            # PWA icons in various sizes
│   │
│   ├── src/                       # Vue source code
│   │   ├── components/           # Reusable Vue components
│   │   │   ├── AppHeader.vue     # Header component
│   │   │   ├── AppFooter.vue     # Footer component
│   │   │   ├── ImageUploader.vue # Component for uploading images
│   │   │   └── ResultsDisplay.vue # Component for displaying results
│   │   │
│   │   ├── views/                # Main pages
│   │   │   ├── HomeView.vue      # Home page
│   │   │   ├── TestingView.vue   # Skin tone testing page
│   │   │   ├── ExploreUndertone.vue # Undertone exploration page
│   │   │   └── Feedback.vue      # User feedback page
│   │   │
│   │   ├── router/               # Routing configuration
│   │   ├── services/             # API services
│   │   ├── App.vue               # Root component
│   │   └── main.js              # Application entry point
│   │
│   ├── styles/                    # Global CSS files
│   ├── index.html                # Main HTML template
│   ├── package.json              # Node.js dependencies
│   └── vite.config.js           # Vite configuration
│
└── server/                        # Flask backend code (not shown)
    ├── app.py                    # Flask application entry point
    ├── models/                   # AI models and database definitions
    ├── utils/                    # Utilities and helper functions
    └── routes/                   # API endpoints
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 14.x or higher
- npm or yarn

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/Capstone_FineYourTone.git
cd Capstone_FineYourTone
```

2. Install Python dependencies
```bash
pip install -r requirements.txt
```

3. Run the backend server
```bash
python server/app.py
```

The backend server will be available at `http://localhost:5000`.

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