<template>
  <div class="results-display">
    <div class="card">
      <div class="card-header">
        <h4>Hasil Klasifikasi</h4>
      </div>

      <div class="card-body">
        <transition name="fade" mode="out-in">
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <p class="processing-text">Analyzing your image...</p>
          </div>
          <div v-else-if="result && result.error" class="error-state">
            <i class="fas fa-exclamation-circle"></i>
            <p>{{ result.message }}</p>
            <div class="error-tips">
              <h4>Tips:</h4>
              <ul>
                <li>
                  Pastikan gambar yang diunggah berformat yang valid (JPG, PNG)
                </li>
                <li>Ukuran gambar tidak melebihi 5MB</li>
                <li>Pastikan wajah terlihat jelas dalam gambar</li>
                <li>Coba muat ulang halaman dan unggah kembali gambar</li>
              </ul>
            </div>
          </div>
          <div v-else-if="result" class="results-content">
            <div class="result-image-container">
              <img
                :src="result.imagePreview"
                alt="Analyzed Image"
                class="result-image" />
            </div>

            <div class="result-details">
              <h3>Hasil Analisis:</h3>
              <div class="skin-tone-result">
                <div class="main-result">
                  <div class="skin-tone-label">
                    {{ getSkinToneLabel(result.skinClass || "") }}
                  </div>
                  <div class="confidence">
                    Confidence:
                    {{ ((result.confidence || 0) * 100).toFixed(0) }}%
                  </div>
                  <button class="recommendation-button" @click="showRecommendations = true" v-if="result && !showRecommendations">
                    Lihat Rekomendasi Warna
                  </button>
                </div>

                <div v-if="showRecommendations" class="recommendations-section">
                  <h4>Rekomendasi Warna untuk {{ getSkinToneLabel(result.skinClass || "") }}</h4>
                  <div class="color-recommendations">
                    <div v-for="(color, index) in getColorRecommendations(result.skinClass)" 
                         :key="index" 
                         class="color-item"
                         :style="{ backgroundColor: color.hex }">
                      <span class="color-name">{{ color.name }}</span>
                    </div>
                  </div>
                </div>

                <div class="probabilities">
                  <h4>Probabilities:</h4>
                  <div class="probability-bars">
                    <div
                      v-for="(value, type) in result.probabilities || {}"
                      :key="type"
                      class="probability-item">
                      <div class="probability-label">
                        {{ getSkinToneLabel(type) }}
                      </div>
                      <div class="probability-bar-container">
                        <div
                          class="probability-bar"
                          :style="{ width: `${(value || 0) * 100}%` }"></div>
                        <span class="probability-value"
                          >{{ ((value || 0) * 100).toFixed(0) }}%</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
            <i class="fas fa-image"></i>
            <p>Upload an image to see the results</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsDisplay",
  props: {
    result: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showRecommendations: false,
      colorRecommendations: {
        dark: [
          { name: 'Putih', hex: '#FFFFFF' },
          { name: 'Merah Muda', hex: '#FFB6C1' },
          { name: 'Biru Muda', hex: '#ADD8E6' },
          { name: 'Kuning Pastel', hex: '#FFFACD' }
        ],
        light: [
          { name: 'Navy', hex: '#000080' },
          { name: 'Hijau Tua', hex: '#006400' },
          { name: 'Burgundy', hex: '#800020' },
          { name: 'Ungu Tua', hex: '#4B0082' }
        ],
        olive: [
          { name: 'Coklat Kayu', hex: '#DEB887' },
          { name: 'Hijau Olive', hex: '#808000' },
          { name: 'Coral', hex: '#FF7F50' },
          { name: 'Turquoise', hex: '#40E0D0' }
        ]
      }
    };
  },
  methods: {
    getSkinToneLabel(toneType) {
      if (!toneType) return "Tidak Diketahui";

      const labels = {
        dark: "Warna Kulit Gelap",
        light: "Warna Kulit Terang",
        olive: "Warna Kulit Zaitun",
      };

      return labels[toneType] || toneType;
    },
    getColorRecommendations(skinType) {
      return this.colorRecommendations[skinType] || [];
    }
  },
  computed: {
    imageUrl() {
      return this.result && (this.result.imgUrl || this.result.imagePreview);
    },
    sortedProbabilities() {
      if (!this.result || !this.result.probabilities) return [];

      // Convert probabilities to array and sort by value
      const entries = Object.entries(this.result.probabilities);
      entries.sort((a, b) => b[1] - a[1]);

      return entries;
    },
  },
};
</script>

<style scoped>
.results-display {
  width: 100%;
  height: 100%;
}

.card {
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(244, 122, 158, 0.1);
  overflow: hidden;
  background-color: white;
  transition: all 0.4s ease;
  height: 100%;
  border: 1px solid rgba(244, 122, 158, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(244, 122, 158, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #ffffff, #ffffff);
  padding: 25px 20px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.card-header h4 {
  margin: 0;
  font-weight: 700;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
}

.card-body {
  padding: 30px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(244, 122, 158, 0.3);
  border-top: 4px solid #f47a9e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.processing-text {
  color: #666;
  font-size: 1.1rem;
}

.results-content {
  width: 100%;
}

.result-image-container {
  margin-bottom: 25px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(244, 122, 158, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.result-image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(244, 122, 158, 0.15);
}

.result-image {
  width: 100%;
  height: auto;
  display: block;
}

.result-details {
  text-align: left;
  width: 100%;
}

.result-details h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
}

.labels-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.label-item {
  background: linear-gradient(
    135deg,
    rgba(244, 122, 158, 0.1),
    rgba(246, 189, 217, 0.1)
  );
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f47a9e;
  font-size: 0.9rem;
  border: 1px solid rgba(244, 122, 158, 0.2);
  transition: all 0.3s ease;
}

.label-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 122, 158, 0.1);
  background: linear-gradient(
    135deg,
    rgba(244, 122, 158, 0.15),
    rgba(246, 189, 217, 0.15)
  );
}

.label-item i {
  font-size: 0.8rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  gap: 15px;
}

.empty-state i {
  font-size: 3rem;
  color: #f47a9e;
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: #d9534f;
}

.error-state i {
  font-size: 3rem;
  margin-bottom: 15px;
}

.error-state p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.error-tips {
  background-color: rgba(217, 83, 79, 0.1);
  border-radius: 10px;
  padding: 15px;
  text-align: left;
  width: 100%;
}

.error-tips h4 {
  margin-bottom: 10px;
  color: #333;
}

.error-tips ul {
  padding-left: 20px;
}

.error-tips li {
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #666;
}

.score {
  margin-left: 5px;
  font-size: 0.8rem;
  opacity: 0.7;
}

.skin-tone-result {
  width: 100%;
}

.main-result {
  margin-bottom: 1.5rem;
  text-align: center;
}

.skin-tone-label {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f47a9e;
  margin-bottom: 0.5rem;
}

.confidence {
  font-size: 1.1rem;
  color: #666;
}

.probabilities {
  margin-top: 1.5rem;
}

.probabilities h4 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.probability-bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.probability-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.probability-label {
  width: 40%;
  font-size: 0.95rem;
  color: #555;
  padding-right: 10px;
}

.probability-bar-container {
  flex-grow: 1;
  height: 20px;
  background: rgba(244, 122, 158, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.probability-bar {
  height: 100%;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border-radius: 10px;
}

.probability-value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: #333;
  font-weight: 600;
}

.recommendation-button {
  margin-top: 15px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(244, 122, 158, 0.2);
}

.recommendation-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(244, 122, 158, 0.3);
}

.recommendations-section {
  margin-top: 20px;
  padding: 20px;
  background: rgba(244, 122, 158, 0.05);
  border-radius: 15px;
  text-align: center;
}

.recommendations-section h4 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.color-recommendations {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.color-item {
  width: 100px;
  height: 100px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.color-name {
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #333;
  position: absolute;
  bottom: 8px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .card-body {
    padding: 20px;
  }

  .result-details h3 {
    font-size: 1.1rem;
  }

  .label-item {
    font-size: 0.85rem;
    padding: 6px 12px;
  }

  .empty-state i {
    font-size: 2.5rem;
  }

  .empty-state p {
    font-size: 1rem;
  }

  .color-item {
    flex: 1 1 calc(50% - 10px);
  }
}
</style>
