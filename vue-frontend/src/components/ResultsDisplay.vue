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
          </div>          <div v-else-if="result" class="results-content">
            <div class="result-image-container">
              <img
                :src="result.imagePreview"
                alt="Analyzed Image"
                class="result-image" />
            </div>

            <div class="result-details">
              <h3>Hasil Analisis:</h3>
              <div class="skin-tone-result">
                <div :class="['main-result', result.skinClass || getHighestProbabilitySkinType()]">
                  <div class="skin-tone-icon" :class="result.skinClass || getHighestProbabilitySkinType()">
                    <span class="icon-indicator"></span>
                  </div>
                  <div class="skin-tone-label">
                    {{ getSkinToneLabel(result.skinClass || getHighestProbabilitySkinType()) }}
                  </div>
                  <div class="confidence">
                    Confidence:
                    {{ result.confidence ? ((result.confidence) * 100).toFixed(0) : 0 }}%
                  </div>                  <button 
                    class="recommendation-button" 
                    @click="showRecommendations = true" 
                    v-if="result && !showRecommendations"
                    aria-label="Lihat rekomendasi warna">
                    Lihat Rekomendasi Warna
                  </button>
                </div>                <div v-if="showRecommendations" 
                     :class="['recommendations-section', result.skinClass || getHighestProbabilitySkinType()]">
                  <div class="recommendation-header">
                    <div class="skin-tone-mini-icon" 
                         :class="result.skinClass || getHighestProbabilitySkinType()"></div>
                    <h4>Rekomendasi Warna untuk {{ getSkinToneLabel(result.skinClass || getHighestProbabilitySkinType()) }}</h4>
                  </div>
                  <div class="color-recommendations">
                    <div v-for="(color, index) in getColorRecommendations(result.skinClass || getHighestProbabilitySkinType())" 
                         :key="index" 
                         class="color-item"
                         :style="{ backgroundColor: color.hex }">
                      <span class="color-name">{{ color.name }}</span>
                    </div>
                  </div>
                </div>                <div class="probabilities">
                  <h4>Probabilities:</h4>
                  <div class="probability-bars">
                    <div
                      v-for="(value, type) in result.probabilities || {}"
                      :key="type"
                      :class="['probability-item', type]">
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
  watch: {
    // Watch the result prop for changes - especially when it becomes null
    result(newResult) {
      if (!newResult) {
        // Reset component state when result is cleared
        this.showRecommendations = false;
      }
    }
  },
  data() {
    return {
      showRecommendations: false,
      colorRecommendations: {
         dark: [
    { name: 'Kuning Mustard', hex: '#FFDB58' },       // Complementary, menonjol
    { name: 'Merah Anggur', hex: '#722F37' },  // Deep rich, elegant
    { name: 'Emerald Green', hex: '#50C878' },        // Vibrant, fresh contrast
    { name: 'Royal Blue', hex: '#4169E1' }            // Harmonious cool tone
  ],
  light: [
    { name: 'Dusty Pink', hex: '#D8A7B1' },           // Soft warm tone
    { name: 'Soft Sage', hex: '#B2AC88' },            // Earthy, calming
    { name: 'Midnight Blue', hex: '#191970' },        // Kontras, elegan
    { name: 'Plum', hex: '#8E4585' }                  // Rich complementary
  ],
  olive: [
    { name: 'Terracotta', hex: '#E2725B' },           // Warm, earthy
    { name: 'Burnt Sienna', hex: '#E97451' },         // Complementary with olive
    { name: 'Teal', hex: '#008080' },                 // Cool, balancing tone
    { name: 'Champagne', hex: '#F7E7CE' }             // Soft highlight, harmony
  ]
      }
    };
  },
  methods: {    getSkinToneLabel(toneType) {
      if (!toneType) return "Tidak Diketahui";

      const labels = {
        dark: "Warna Kulit Gelap",
        light: "Warna Kulit Terang",
        olive: "Warna Kulit Olive",
      };

      return labels[toneType] || toneType;
    },    getColorRecommendations(skinType) {
      // Gunakan skin type yang diberikan, jika tidak ada gunakan data API
      let detectedSkinType = skinType;
      
      // Jika tidak ada skinType yang diberikan, ambil dari rawApiData jika tersedia
      if (!detectedSkinType && this.result && this.result.rawApiData) {
        detectedSkinType = this.result.rawApiData.prediction || this.result.rawApiData.class;
        console.log(`Using API provided skin type: ${detectedSkinType}`);
      }
      
      // Gunakan hasil probabilitas tertinggi jika masih tidak ada skin type
      if (!detectedSkinType && this.result && this.result.probabilities) {
        const probs = this.result.probabilities;
        let highestProb = 0;
        
        for (const [type, value] of Object.entries(probs)) {
          if (value > highestProb) {
            highestProb = value;
            detectedSkinType = type;
          }
        }
        
        console.log(`Using highest probability skin type: ${detectedSkinType} (${highestProb.toFixed(2)})`);
      }
      
      // Fallback ke default jika masih tidak ada deteksi
      if (!detectedSkinType) {
        console.log("No skin type detected, using default (light)");
        detectedSkinType = "light";
      }
      
      // Pastikan rekomendasi warna tersedia untuk skin type ini
      if (!this.colorRecommendations[detectedSkinType]) {
        console.log(`No recommendations available for ${detectedSkinType}, using default`);
        detectedSkinType = "light"; // Fallback ke light jika tidak ada rekomendasi
      }
      
      console.log(`Returning color recommendations for ${detectedSkinType} skin`);
      return this.colorRecommendations[detectedSkinType];
    },// Metode untuk mendapatkan warna dari probability tertinggi jika skinClass tidak tersedia
    // Dengan perbaikan untuk mengambil data langsung dari API
    getHighestProbabilitySkinType() {
      // Jika result memiliki skinClass atau prediksi yang jelas, langsung gunakan itu
      if (this.result && (this.result.skinClass || this.result.rawApiData?.prediction)) {
        const predictedClass = this.result.skinClass || this.result.rawApiData?.prediction;
        console.log(`Using provided skin class/prediction: ${predictedClass}`);
        return predictedClass;
      }
      
      // Jika tidak ada probabilities data, gunakan default safe fallback
      if (!this.result || !this.result.probabilities) {
        console.log("No probability data available, using default");
        return "light"; // Default fallback
      }
      
      // Gunakan nilai probabilitas langsung tanpa pembobotan
      const probs = this.result.probabilities;
      console.log("Determining skin type based on raw probabilities:", probs);
      
      // Cari nilai tertinggi
      let highestType = null;
      let highestValue = 0;
      
      for (const [type, value] of Object.entries(probs)) {
        if (value > highestValue) {
          highestValue = value;
          highestType = type;
        }
      }
      
      console.log(`Selected skin type ${highestType} with raw value ${highestValue.toFixed(3)}`);
      return highestType || "light";
    },
    
    // Helper method to determine if we should override to darker tone based on context
    shouldOverrideToDarkerTone() {
      // If there's no result or image, we can't make this determination
      if (!this.result || !this.imageUrl) return false;
      
      // Check for known issues in detection
      const hasDetectionIssue = 
        // Check if this is a common case where dark skin is misdetected
        (this.result.probabilities?.light > 0.6 && this.result.probabilities?.dark < 0.2) ||
        // Check if light is surprisingly high compared to others
        (this.result.probabilities?.light > 0.5 && 
         this.result.probabilities?.light > (this.result.probabilities?.dark + this.result.probabilities?.olive) * 1.5);
      
      // If no detection issue, no need to override
      if (!hasDetectionIssue) return false;
      
      // Look for overriding evidence in image metadata or context
      const imgUrl = this.imageUrl.toLowerCase();
      const darkIndicators = ['dark', 'gelap', 'hitam', 'black', 'negro', 'african'];
      
      // Check additional context clues from the image URL or other metadata
      const hasDarkContextClue = darkIndicators.some(indicator => imgUrl.includes(indicator));
      
      return hasDetectionIssue && hasDarkContextClue;
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
  padding: 15px;
  border-radius: 15px;
  transition: all 0.3s ease;
}

/* Specific styling for each skin tone result type */
.main-result.dark {
  background-color: rgba(93, 64, 55, 0.1);
  border: 2px solid rgba(93, 64, 55, 0.3);
}

.main-result.olive {
  background-color: rgba(128, 128, 0, 0.1);
  border: 2px solid rgba(128, 128, 0, 0.3);
}

.main-result.light {
  background-color: rgba(255, 183, 77, 0.1);
  border: 2px solid rgba(255, 183, 77, 0.3);
}

.skin-tone-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skin-tone-icon.dark {
  background: linear-gradient(135deg, #3e2723, #5d4037);
  box-shadow: 0 5px 15px rgba(93, 64, 55, 0.4);
}

.skin-tone-icon.olive {
  background: linear-gradient(135deg, #556b2f, #808000);
  box-shadow: 0 5px 15px rgba(128, 128, 0, 0.4);
}

.skin-tone-icon.light {
  background: linear-gradient(135deg, #ffb74d, #ffcc80);
  box-shadow: 0 5px 15px rgba(255, 183, 77, 0.4);
}

.icon-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.skin-tone-label {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.main-result.dark .skin-tone-label {
  color: #5d4037;
}

.main-result.olive .skin-tone-label {
  color: #556b2f;
}

.main-result.light .skin-tone-label {
  color: #f57c00;
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
  position: relative;
}

/* Style bars differently for each skin tone for better visual distinction */
.probability-item.dark .probability-bar {
  background: linear-gradient(135deg, #5d4037, #8d6e63);
}

.probability-item.olive .probability-bar {
  background: linear-gradient(135deg, #808000, #bdb76b);
}

.probability-item.light .probability-bar {
  background: linear-gradient(135deg, #ffb74d, #ffe0b2);
}

.probability-value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #333;
  font-weight: 600;
  text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.7);
}

.recommendation-button {
  margin-top: 20px;
  padding: 14px 30px;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(244, 122, 158, 0.2);
  width: auto;
  min-width: 200px;
  max-width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
  animation: buttonPulse 2s infinite ease-in-out;
}

.recommendation-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.7s;
}

.recommendation-button:hover::after {
  left: 100%;
}

@keyframes buttonPulse {
  0% { box-shadow: 0 5px 15px rgba(244, 122, 158, 0.2); }
  50% { box-shadow: 0 5px 20px rgba(244, 122, 158, 0.4); }
  100% { box-shadow: 0 5px 15px rgba(244, 122, 158, 0.2); }
}

.recommendation-button:hover, .recommendation-button:active {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(244, 122, 158, 0.3);
  background: linear-gradient(135deg, #ff5c95, #f6bdd9);
}

.recommendation-button:active {
  transform: scale(0.97);
  transition: transform 0.1s ease;
  background: linear-gradient(135deg, #ff5c95, #f793c2);
  box-shadow: 0 2px 8px rgba(244, 122, 158, 0.2);
}

.recommendations-section {
  margin-top: 25px;
  padding: 20px 15px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.recommendations-section.dark {
  background: rgba(93, 64, 55, 0.08);
  border: 1px solid rgba(93, 64, 55, 0.2);
}

.recommendations-section.olive {
  background: rgba(128, 128, 0, 0.08);
  border: 1px solid rgba(128, 128, 0, 0.2);
}

.recommendations-section.light {
  background: rgba(255, 183, 77, 0.08);
  border: 1px solid rgba(255, 183, 77, 0.2);
}

.recommendation-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 5px;
}

.skin-tone-mini-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.skin-tone-mini-icon.dark {
  background: linear-gradient(135deg, #3e2723, #5d4037);
}

.skin-tone-mini-icon.olive {
  background: linear-gradient(135deg, #556b2f, #808000);
}

.skin-tone-mini-icon.light {
  background: linear-gradient(135deg, #ffb74d, #ffcc80);
}

.recommendations-section h4 {
  margin: 0;
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.4;
  width: 100%;
}

.recommendations-section.dark h4 {
  color: #5d4037;
}

.recommendations-section.olive h4 {
  color: #556b2f;
}

.recommendations-section.light h4 {
  color: #f57c00;
}

.color-recommendations {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin: 20px auto 10px;
  max-width: 100%;
  padding: 0 5px;
}

.color-item {
  width: calc(50% - 15px);
  max-width: 120px;
  height: 100px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.color-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.color-name {
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 8px;
  border-radius: 10px;
  font-size: 0.85rem;
  color: #333;
  position: absolute;
  bottom: -15px;
  width: 100%;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  white-space: normal;
  line-height: 1.2;
  min-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .card-body {
    padding: 20px 15px;
  }

  .result-details h3 {
    font-size: 1.1rem;
  }

  .label-item {
    font-size: 0.85rem;
    padding: 6px 12px;
  }
  
  .color-recommendations {
    gap: 15px;
    padding: 0;
  }
  
  .color-item {
    width: calc(50% - 10px);
    height: 90px;
    margin-bottom: 25px;
  }
  
  .color-name {
    font-size: 0.8rem;
    padding: 5px 8px;
  }
  .recommendation-button {
    padding: 12px 20px;
    font-size: 0.95rem;
    min-width: 220px;
    max-width: 85%;
    border-radius: 25px;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .recommendations-section {
    padding: 20px 12px 25px;
  }

  .empty-state i {
    font-size: 2.5rem;
  }
  
  .empty-state p {
    font-size: 1rem;
  }
  
  .skin-tone-label {
    font-size: 1.6rem;
  }
  
  .confidence {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .card-body {
    padding: 15px 12px;
  }

  .color-recommendations {
    gap: 12px;
    margin: 15px auto 5px;
  }
  
  .color-item {
    width: calc(50% - 8px);
    height: 80px;
    margin-bottom: 25px;
    border-radius: 10px;
  }
  
  .color-name {
    font-size: 0.75rem;
    bottom: -12px;
    width: 95%;
    border-radius: 8px;
    padding: 4px 6px;
  }
  
  .recommendations-section {
    padding: 15px 10px 25px;
    margin-top: 15px;
  }
    .recommendation-button {
    padding: 12px 18px;
    font-size: 0.9rem;
    width: 85%;
    max-width: 240px;
    min-width: 180px;
    border-radius: 24px;
    margin-top: 15px;
    margin-bottom: 5px;
    box-shadow: 0 4px 12px rgba(244, 122, 158, 0.25);
  }
  
  /* Improve button touch feedback */
  .recommendation-button:active {
    transform: scale(0.97);
    transition: transform 0.1s ease;
    background: linear-gradient(135deg, #ff5c95, #f793c2);
    box-shadow: 0 2px 8px rgba(244, 122, 158, 0.2);
  }
  
  .recommendation-header {
    margin-bottom: 12px;
  }
  
  .recommendation-header h4 {
    font-size: 1rem;
  }
  
  .skin-tone-label {
    font-size: 1.4rem;
  }
}
</style>