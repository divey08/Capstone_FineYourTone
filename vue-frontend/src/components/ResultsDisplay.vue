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
          
          <div v-else-if="result" class="results-content">
            <div class="result-image-container">
              <img :src="result.imgUrl" alt="Analyzed Image" class="result-image" />
            </div>
            
            <div class="result-details">
              <h3>Detected Labels:</h3>
              <div class="labels-container">
                <div v-for="(label, index) in result.detectedLabels" 
                     :key="index"
                     class="label-item">
                  <i class="fas fa-tag"></i>
                  <span>{{ label }}</span>
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
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Poppins', sans-serif;
}

.labels-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.label-item {
  background: linear-gradient(135deg, rgba(244, 122, 158, 0.1), rgba(246, 189, 217, 0.1));
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
  background: linear-gradient(135deg, rgba(244, 122, 158, 0.15), rgba(246, 189, 217, 0.15));
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
}
</style>
