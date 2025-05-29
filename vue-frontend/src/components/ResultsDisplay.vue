<template>
  <div class="results-display" data-aos="fade-up" data-aos-delay="100">
    <div class="card">
      <div class="card-header">
        <h4>Hasil Klasifikasi</h4>
      </div>
      
      <div class="card-body">
        <transition name="fade" mode="out-in">
          <div v-if="loading" class="loading">
            <div class="loading-animation">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
            <p class="processing-text">Analyzing your image...</p>
          </div>
          
          <div v-else-if="result" class="results-content animate__animated animate__fadeIn">
            <h2 class="result-title">Hasil Prediksi</h2>
            
            <div class="result-image-container">
              <img :src="result.imgUrl" alt="Predicted Image" class="result-image" />
            </div>
            
            <div v-if="result.detectedLabels && Object.keys(result.detectedLabels).length > 0" class="results-details">
              <h3 class="labels-title">Label yang Terdeteksi:</h3>
              
              <div class="labels-container">
                <transition-group name="list" tag="ul" class="labels-list">
                  <li v-for="(score, label) in sortedLabels" :key="label" class="label-item">
                    <div class="label-content">
                      <span class="label-name">{{ label }}</span>
                      <div class="progress-container">
                        <div class="progress-bar" :style="{width: `${score * 100}%`}"></div>
                      </div>
                      <span class="label-score">{{ (score * 100).toFixed(1) }}%</span>
                    </div>
                  </li>
                </transition-group>
              </div>
                <div class="recommendation-box" v-if="primarySkinTone">
                <div class="recommendation-icon">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <div class="recommendation-content">
                  <h4>Rekomendasi Tone</h4>
                  <p>Berdasarkan analisis, tone kulit Anda adalah <strong>{{ primarySkinTone }}</strong>.</p>
                </div>
              </div>
            </div>
            
            <div v-else class="no-detection animate__animated animate__fadeIn">
              <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>Tidak ada objek yang terdeteksi.</p>
                <p class="suggestion">Coba gunakan gambar lain dengan pencahayaan yang baik.</p>
              </div>
            </div>
          </div>
          
          <div v-else class="no-results">
            <div class="welcome-state">
              <div class="welcome-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <h3>Ready to Analyze</h3>
              <p>Upload gambar wajah untuk mendapatkan analisis tone kulit</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsDisplay',
  props: {
    result: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageUrl() {
      return this.result && this.result.imgUrl;
    },
    sortedLabels() {
      if (!this.result || !this.result.detectedLabels) return {};
      
      // Sort labels by score (highest first)
      const entries = Object.entries(this.result.detectedLabels);
      entries.sort((a, b) => b[1] - a[1]);
      
      return Object.fromEntries(entries);
    },
    primarySkinTone() {
      if (!this.result || !this.result.detectedLabels) return null;
      
      // Filter for skin tone labels and find the one with highest score
      const skinTones = ['dark skin', 'fair skin', 'light skin', 'medium skin'];
      let highestScore = 0;
      let primaryTone = null;
      
      for (const [label, score] of Object.entries(this.result.detectedLabels)) {
        if (skinTones.includes(label) && score > highestScore) {
          highestScore = score;
          primaryTone = label;
        }
      }
      
      return primaryTone;
    }
  }
}
</script>

<style scoped>
.results-display {
  width: 100%;
}

.card {
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px rgba(50, 50, 93, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: linear-gradient(120deg, var(--accent) 0%, var(--primary) 100%);
  padding: 25px 20px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.card-header:before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(30deg);
  animation: resultsHeaderShine 8s infinite linear;
}

@keyframes resultsHeaderShine {
  0% { transform: translateX(-100%) rotate(30deg); }
  100% { transform: translateX(100%) rotate(30deg); }
}

.card-header h4 {
  margin: 0;
  font-weight: 700;
  font-size: 22px;
}

.card-body {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  background: linear-gradient(180deg, rgba(248, 249, 250, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%);
}

/* Loading animation improved */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.loading:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(52, 152, 219, 0.03) 0%, rgba(255, 255, 255, 0) 70%);
  z-index: -1;
  transform-origin: center;
  will-change: transform;
  animation: pulseBackgroundOptimized 3s infinite alternate ease-in-out;
}

@keyframes pulseBackgroundOptimized {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.2); opacity: 0.8; }
}

.loading-animation {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  transform-origin: center bottom;
  animation: slight-bounce 2s infinite ease-in-out;
}

@keyframes slight-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.circle {
  width: 15px;
  height: 15px;
  margin: 0 8px;
  background-color: var(--accent);
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out both;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.circle:nth-child(1) {
  animation-delay: -0.3s;
  background: linear-gradient(135deg, var(--accent-light), var(--accent));
}

.circle:nth-child(2) {
  animation-delay: -0.15s;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
}

.circle:nth-child(3) {
  animation-delay: 0s;
  background: linear-gradient(135deg, var(--accent-light), var(--primary));
}

.processing-text {
  font-size: 1.1rem;
  color: var(--accent);
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  animation: fadeInOut 2s infinite alternate;
}

@keyframes fadeInOut {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* Results content */
.results-content {
  width: 100%;
  text-align: center;
}

.result-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
}

.result-title::after {
  content: '';
  position: absolute;
  height: 3px;
  width: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  bottom: -8px;
  left: 25%;
  border-radius: 3px;
}

/* Improved Result Image Container */
.result-image-container {
  margin: 25px 0;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 5px solid white;
  background: white;
  max-width: 100%;
  will-change: transform;
}

.result-image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.result-image-container:before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(135deg, var(--accent-light) 0%, transparent 50%, var(--accent) 100%);
  border-radius: 20px;
  opacity: 0.2;
  filter: blur(10px);
  /* Animasi statis di mobile, berputar di desktop */
  animation: pulseGradient 3s ease-in-out infinite;
}

@media (min-width: 768px) {
  .result-image-container:before {
    animation: pulseGradient 3s ease-in-out infinite, rotateGradientDesktop 12s linear infinite;
  }
}

@keyframes pulseGradient {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.3; }
}

@keyframes rotateGradientDesktop {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.result-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  transform: scale(1);
  transition: transform 0.3s ease;
  will-change: transform;
}

.result-image:hover {
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .result-image {
    max-width: 100%;
  }
  
  .result-image:hover {
    transform: none; /* Tidak ada efek hover pada mobile */
  }
}

/* Labels styles */
.results-details {
  width: 100%;
  text-align: left;
  margin-top: 30px;
}

.labels-title {
  font-size: 18px;
  color: var(--text-dark);
  margin-bottom: 15px;
  font-weight: 600;
}

.labels-container {
  position: relative;
  width: 100%;
}

.labels-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.label-item {
  margin-bottom: 10px;
  transform-origin: left;
  transition: transform 0.3s ease, opacity 0.3s ease;
  will-change: transform, opacity;
}

.label-content {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: rgba(249, 249, 249, 0.7);
  border-radius: 30px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  transition: background-color 0.3s ease;
}

.label-content:hover {
  background-color: rgba(249, 249, 249, 0.9);
}

@media (max-width: 480px) {
  .label-content {
    padding: 8px 12px;
    flex-wrap: wrap;
  }
}

.label-name {
  min-width: 100px;
  font-weight: 600;
  color: var(--text-dark);
}

.progress-container {
  flex-grow: 1;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 15px;
  will-change: width; /* Optimasi untuk animasi width */
}

@media (max-width: 480px) {
  .label-name {
    min-width: auto;
    width: 100%;
    margin-bottom: 5px;
    font-size: 14px;
  }
  
  .progress-container {
    margin: 5px 10px 5px 0;
    height: 6px;
  }
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

.label-score {
  min-width: 50px;
  text-align: right;
  font-weight: 600;
  color: var(--primary-color);
}

.recommendation-box {
  margin-top: 30px;
  display: flex;
  padding: 18px 20px;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.06) 0%, rgba(44, 62, 80, 0.04) 100%);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.8s ease-in-out;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(52, 152, 219, 0.1);
  will-change: transform, opacity;
}

.recommendation-box:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(to bottom, var(--accent), var(--accent-light));
}

@media (max-width: 480px) {
  .recommendation-box {
    padding: 15px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .recommendation-box:before {
    height: 4px;
    width: 100%;
    background: linear-gradient(to right, var(--accent), var(--accent-light));
  }
}

.recommendation-icon {
  font-size: 24px;
  margin-right: 15px;
  min-width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(52, 152, 219, 0.08);
  border-radius: 50%;
  color: var(--accent);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.15);
  transition: all 0.3s ease;
}

.recommendation-box:hover .recommendation-icon {
  transform: scale(1.05);
  background: rgba(52, 152, 219, 0.12);
}

.recommendation-content {
  flex-grow: 1;
}

@media (max-width: 480px) {
  .recommendation-icon {
    margin-right: 0;
    margin-bottom: 12px;
  }
}

.recommendation-content h4 {
  margin: 0 0 5px 0;
  color: var(--primary-color);
  font-size: 16px;
}

.recommendation-content p {
  margin: 0;
  color: var(--text-light);
  font-size: 14px;
}

.recommendation-content strong {
  color: var(--text-dark);
}

/* Empty states */
.no-detection, .no-results {
  color: var(--text-light);
  font-size: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-state, .welcome-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.empty-state svg, .welcome-state svg {
  margin-bottom: 20px;
  color: var(--text-light);
  opacity: 0.7;
}

.empty-state p, .welcome-state p {
  margin: 5px 0;
  color: var(--text-light);
}

.welcome-state h3 {
  color: var(--text-dark);
  margin-bottom: 10px;
}

.suggestion {
  font-size: 14px;
  opacity: 0.8;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
  will-change: opacity, transform;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
  will-change: opacity, transform;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-15px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  /* Kurangi atau nonaktifkan animasi untuk pengguna yang menyetel preferensi reduced motion */
  .fade-enter-active,
  .fade-leave-active,
  .list-enter-active,
  .list-leave-active,
  .result-image-container:before,
  .recommendation-box,
  .loading:before {
    transition-duration: 0.1s;
    animation-duration: 0.1s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
</style>
