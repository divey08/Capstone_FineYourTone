<template>
  <div class="results-display">
    <div class="card">
      <div class="card-header">
        <h4>Hasil Klasifikasi</h4>
      </div>
      <div class="card-body">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Processing image...</p>
        </div>
        
        <div v-else-if="result" class="results-content">
          <h2>Hasil Prediksi:</h2>
          <div class="result-image">
            <img :src="result.imgUrl" alt="Predicted Image" />
          </div>
          
          <div v-if="result.detectedLabels && Object.keys(result.detectedLabels).length > 0" class="labels">
            <h3>Label yang Terdeteksi:</h3>
            <ul>
              <li v-for="(score, label) in result.detectedLabels" :key="label">
                {{ label }}: {{ (score * 100).toFixed(2) }}%
              </li>
            </ul>
          </div>
          
          <div v-else class="no-detection">
            <p>Tidak ada objek yang terdeteksi.</p>
          </div>
        </div>
        
        <div v-else class="no-results">
          <p>Upload gambar untuk melihat hasil klasifikasi</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsDisplay',  props: {
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
    }
  }
}
</script>

<style scoped>
.results-display {
  width: 100%;
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  height: 100%;
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.card-header h4 {
  margin: 0;
  color: #333;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: #0ea2bd;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.results-content {
  width: 100%;
  text-align: center;
}

.result-image {
  margin: 15px 0;
  max-width: 300px;
  margin: 0 auto;
}

.result-image img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.labels {
  margin-top: 20px;
  text-align: left;
}

.labels h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.labels ul {
  list-style-type: none;
  padding: 0;
}

.labels li {
  padding: 8px 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-weight: 500;
}

.no-detection, .no-results {
  color: #6c757d;
  font-size: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
