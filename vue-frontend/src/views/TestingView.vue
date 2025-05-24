<template>
  <div class="testing-page">
    <div class="breadcrumbs">
      <div class="container">
        <div class="breadcrumbs-content">
          <h2>Testing Page</h2>
          <nav>
            <ol>
              <li><router-link to="/">Home</router-link></li>
              <li>Testing Page</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>

    <section class="testing-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <ImageUploader @upload="handleImageUpload" />
          </div>
          <div class="col">
            <ResultsDisplay :result="result" :loading="isLoading" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader.vue';
import ResultsDisplay from '@/components/ResultsDisplay.vue';
import apiService from '@/services/api.js';

export default {
  name: 'TestingView',
  components: {
    ImageUploader,
    ResultsDisplay
  },
  data() {
    return {
      result: null,
      isLoading: false,
      error: null
    }
  },
  methods: {
    async handleImageUpload(formData) {
      this.isLoading = true;
      this.error = null;
      
      try {        const response = await apiService.uploadImage(formData);
        
        // Process the response
        if (response.data) {
          this.result = {
            imgUrl: `/api/static/${response.data.img_path}`,
            detectedLabels: response.data.detected_labels
          };
        }
      } catch (error) {
        this.error = error.message || 'Failed to upload image';
        console.error('Error uploading image:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.testing-page {
  padding-top: 80px;
}

.breadcrumbs {
  background-color: #f8f9fa;
  padding: 20px 0;
  margin-bottom: 40px;
}

.breadcrumbs-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumbs h2 {
  margin: 0;
  font-size: 28px;
  color: #333;
}

.breadcrumbs ol {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumbs li {
  display: inline-block;
}

.breadcrumbs li + li::before {
  content: '/';
  padding: 0 10px;
  color: #6c757d;
}

.breadcrumbs a {
  color: #0ea2bd;
  text-decoration: none;
}

.testing-section {
  padding: 20px 0 60px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
}

.col {
  flex: 1;
  padding: 15px;
  min-width: 300px;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
  
  .breadcrumbs-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .breadcrumbs h2 {
    margin-bottom: 10px;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
