<template>  <div class="testing-page">
    <div class="hero-banner modern-gradient">
      <div class="container">
        <div class="hero-content" data-aos="fade-up">
          <div class="hero-icon">
            <i class="fas fa-camera-retro"></i>
          </div>
          <h1 class="page-title">Skin Tone Detection</h1>
          <p class="subtitle">Unggah foto untuk mendeteksi warna kulit Anda</p>
          <div class="hero-action">
            <a href="#upload-section" class="hero-btn">
              <i class="fas fa-angle-down"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="wave-shape">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fff" fill-opacity="1" d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,234.7C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>    <section id="upload-section" class="testing-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title"><i class="fas fa-palette"></i> Analisis Warna Kulit</h2>
          <p class="section-description">Unggah gambar wajah Anda untuk mendapatkan analisis warna kulit yang akurat</p>
        </div>

        <div class="row">
          <div class="col" data-aos="fade-right" data-aos-delay="100">
            <ImageUploader @upload="handleImageUpload" />
          </div>
          <div class="col" data-aos="fade-left" data-aos-delay="200">
            <ResultsDisplay :result="result" :loading="isLoading" />
          </div>
        </div>        <div class="info-box" data-aos="fade-up" data-aos-delay="300">
          <div class="info-icon">
            <i class="fas fa-info-circle"></i>
          </div>
          <div class="info-content">
            <h3>Cara Kerja</h3>
            <p>
            Sistem kami dirancang untuk menganalisis warna kulit Anda dan memberikan hasil yang akurat.
            Pastikan foto diambil dengan pencahayaan yang baik untuk mendapatkan hasil terbaik.
           </p>
          </div>
        </div>
      </div>
    </section>    <section class="benefits-section" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title"><i class="fas fa-award"></i> Keunggulan FineYourTone</h2>
        
        <div class="benefits-grid">
          <div class="benefit-card" data-aos="fade-up" data-aos-delay="100">
            <div class="benefit-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>Akurat</h3>
            <p>Teknologi deteksi warna kulit yang akurat dan terpercaya untuk hasil yang konsisten setiap saat</p>
          </div>
          
          <div class="benefit-card" data-aos="fade-up" data-aos-delay="200">
            <div class="benefit-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <h3>Cepat</h3>
            <p>Proses analisis hanya membutuhkan waktu beberapa detik</p>
          </div>
          
          <div class="benefit-card" data-aos="fade-up" data-aos-delay="300">
            <div class="benefit-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Responsif</h3>
            <p>Dapat digunakan dengan nyaman di perangkat mobile maupun desktop</p>
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

<!-- CSS dipindahkan ke style.css -->
