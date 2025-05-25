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
                <div class="recommendation-icon">💡</div>
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
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  height: 100%;
  background-color: var(--background-white);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
  padding: 20px;
  text-align: center;
  color: white;
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
}

/* Loading animation */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.loading-animation {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.circle {
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background-color: var(--primary-color);
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out both;
}

.circle:nth-child(1) {
  animation-delay: -0.3s;
  background-color: var(--primary-color);
}

.circle:nth-child(2) {
  animation-delay: -0.15s;
  background-color: var(--secondary-color);
}

.circle:nth-child(3) {
  background-color: var(--accent-color);
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.processing-text {
  font-size: 16px;
  color: var(--text-light);
  font-weight: 500;
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

.result-image-container {
  margin: 20px 0;
  max-width: 100%;
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  position: relative;
}

.result-image {
  width: 100%;
  max-width: 300px;
  display: block;
  transform: scale(1);
  transition: transform 0.5s ease;
}

.result-image:hover {
  transform: scale(1.02);
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
  margin-bottom: 12px;
  transform-origin: left;
  transition: all 0.4s;
}

.label-content {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: rgba(249, 249, 249, 0.8);
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.label-name {
  min-width: 100px;
  font-weight: 600;
  color: var(--text-dark);
}

.progress-container {
  flex-grow: 1;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 15px;
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
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(14, 162, 189, 0.1), rgba(85, 82, 238, 0.1));
  border-radius: var(--border-radius);
  border-left: 4px solid var(--primary-color);
  animation: fadeIn 1s ease-in-out;
}

.recommendation-icon {
  font-size: 24px;
  margin-right: 15px;
}

.recommendation-content {
  flex-grow: 1;
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
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
