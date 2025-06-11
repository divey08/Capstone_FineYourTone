<template>
  <div class="testing-page">
    <div class="hero-banner">
      <div class="overlay"></div>
      <div class="container">
        <div class="hero-content" data-aos="fade-up">
          <div class="hero-icon">
            <i class="fas fa-camera-retro"></i>
          </div>
          <h1 class="page-title">Skin Tone Detection</h1>
          <p class="subtitle">
            Kenali warna kulit Anda dengan mengunggah foto.
          </p>
        </div>
      </div>
    </div>

    <!-- Offline warning message -->
    <div v-if="!isOnline" class="offline-message">
      <div class="offline-message-content">
        <i class="fas fa-wifi-slash"></i>
        <h3>Anda sedang offline</h3>
        <p>Fitur analisis warna kulit memerlukan koneksi internet untuk memproses gambar.</p>
        <button @click="checkConnection" class="retry-connection-btn">
          Periksa Koneksi
        </button>
      </div>
    </div>

    <section id="upload-section" class="testing-section" v-if="isOnline">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">
            <i class="fas fa-palette"></i> Analisis Warna Kulit
          </h2>
          <p class="section-description">
            Unggah gambar wajah Anda untuk mendapatkan analisis warna kulit yang
            akurat
          </p>
        </div><div class="upload-container">
          <div class="upload-box" data-aos="fade-right" data-aos-delay="100">
            <ImageUploader @upload="handleImageUpload" @reset="handleReset" />
          </div>
          <div class="result-box" data-aos="fade-left" data-aos-delay="200">
            <ResultsDisplay :result="result" :loading="isLoading" />
          </div>
        </div>

        <div class="info-box" data-aos="fade-up" data-aos-delay="300">
          <div class="info-icon">
            <i class="fas fa-info-circle"></i>
          </div>
          <div class="info-content">
            <h3>Cara Kerja</h3>
            <p>
              Sistem kami dirancang untuk menganalisis warna kulit Anda dan
              memberikan hasil yang akurat. Pastikan foto diambil dengan
              pencahayaan yang baik untuk mendapatkan hasil terbaik.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="benefits-section" data-aos="fade-up">
      <div class="container">
        <h2 class="section-title">
          <i class="fas fa-award"></i> Keunggulan FineYourTone
        </h2>

        <div class="benefits-grid">
          <div class="benefit-card" data-aos="fade-up" data-aos-delay="100">
            <div class="benefit-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>Akurat</h3>
            <p>
              Teknologi deteksi warna kulit yang akurat dan terpercaya untuk
              hasil yang konsisten setiap saat
            </p>
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
            <p>
              Dapat digunakan dengan nyaman di perangkat mobile maupun desktop
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageUploader from "@/components/ImageUploader.vue";
import ResultsDisplay from "@/components/ResultsDisplay.vue";
import apiService from "@/services/api.js";

export default {
  name: "TestingView",
  components: {
    ImageUploader,
    ResultsDisplay,
  },  data() {
    return {
      result: null,
      isLoading: false,
      error: null,
      isOnline: navigator.onLine
    };
  },
  mounted() {
    // Monitor online/offline status
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
      if (!this.isOnline) {
        // Reset loading state if connection was lost during processing
        this.isLoading = false;
      }
    },
    
    checkConnection() {
      // Check if back online
      this.isOnline = navigator.onLine;
      if (this.isOnline) {
        // If we're back online, refresh component
        this.$forceUpdate();
      }
    },
    
    handleReset() {
      // Reset all data when user clicks on reset button
      this.result = null;
      this.error = null;
      this.isLoading = false;
      console.log("Reset dilakukan, semua hasil klasifikasi dihapus");
    },
    
    async handleImageUpload(formData) {
      this.isLoading = true;
      this.error = null;
      this.result = null;      try {
        const response = await apiService.uploadImage(formData);

        // Process the response based on the new structure
        if (response.data) {
          console.log("API Response:", response.data);

          // Struktur default jika ada data yang tidak tersedia
          const defaultSkinClass = "light"; // Default ke salah satu kategori yang ada
          const defaultConfidence = 0.8; // Default confidence level
          const defaultProbabilities = {
            light: 0.8,
            olive: 0.15,
            dark: 0.05
          };

          this.result = {
            // Use the uploaded image from your form as the preview
            imagePreview: URL.createObjectURL(formData.get("image")),
            // Map the new response format with fallbacks jika data tidak lengkap
            skinClass: response.data.class || defaultSkinClass,
            confidence: response.data.confidence || defaultConfidence,
            probabilities: response.data.probabilities || defaultProbabilities,
          };
          
          // Debugging log
          console.log("Processed Result:", this.result);
        }
      } catch (error) {
        this.error = error.message || "Failed to upload image";
        console.error("Error uploading image:", error);

        // Set result with error information to display to user
        this.result = {
          error: true,
          message: `Terjadi kesalahan: ${this.error}`,
        };
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.testing-page {
  min-height: 100vh;
}

.hero-banner {
  background: url("/img/kegunaan 3.jpg") center/cover no-repeat;
  padding: 150px 0 80px; /* Menambah padding untuk memperpanjang foto */
  position: relative;
  overflow: hidden;
  text-align: center;
  min-height: 650px; /* Memperbesar tinggi minimum */
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.85),
    rgba(255, 255, 255, 0.8)
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-icon {
  font-size: 3.5rem;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
  color: #333;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
}

.page-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: "Playfair Display", serif;
  color: #333;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  color: #444;
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.3);
}

/* Removed hero-btn styles as the button has been removed */

.testing-section {
  background: #fff;
  padding: 80px 0;
  position: relative;
  margin-top: 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.section-header::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(45deg, #f47a9e, #f6bdd9);
  border-radius: 3px;
}

.section-title {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
}

.section-title i {
  color: #f47a9e;
  margin-right: 10px;
}

.section-description {
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
}

.upload-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 1rem;
}

.upload-box,
.result-box {
  background: white;
  border-radius: 25px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(244, 122, 158, 0.08);
  transition: all 0.4s ease;
  border: 1px solid rgba(244, 122, 158, 0.1);
}

.upload-box:hover,
.result-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(244, 122, 158, 0.12);
  border-color: rgba(244, 122, 158, 0.2);
}

.info-box {
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border-radius: 25px;
  padding: 2.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin: 3rem auto;
  max-width: 1000px;
  box-shadow: 0 10px 30px rgba(244, 122, 158, 0.08);
  border: 1px solid rgba(244, 122, 158, 0.1);
  transition: all 0.4s ease;
}

.info-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(244, 122, 158, 0.12);
}

.info-icon {
  font-size: 3rem;
  color: #ffffff;
  flex-shrink: 0;
}

.info-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
  color: #ffffff;
}

.info-content p {
  color: #ffffff;
  line-height: 1.6;
  font-size: 1.1rem;
}

.benefits-section {
  padding: 100px 0;
  background: white;
  position: relative;
  overflow: hidden;
}

.benefits-section::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    45deg,
    rgba(244, 122, 158, 0.03),
    rgba(246, 189, 217, 0.05)
  );
  pointer-events: none;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
  padding: 0 1rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.benefit-card {
  background: white;
  border-radius: 25px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid rgba(244, 122, 158, 0.1);
  box-shadow: 0 10px 30px rgba(244, 122, 158, 0.08);
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(244, 122, 158, 0.12);
  border-color: rgba(244, 122, 158, 0.2);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  line-height: 80px;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border-radius: 50%;
  margin: 0 auto 2rem;
  color: white;
  font-size: 1.8rem;
  position: relative;
  transition: all 0.4s ease;
}

.benefit-card:hover .benefit-icon {
  transform: scale(1.1);
  box-shadow: 0 10px 25px rgba(244, 122, 158, 0.2);
}

.benefit-card h3 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
}

.benefit-card p {
  color: #666;
  line-height: 1.6;
  font-size: 1.1rem;
}

/* Offline message styles */
.offline-message {
  background: #fff;
  border-radius: 15px;
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.offline-message-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.offline-message i {
  font-size: 3rem;
  color: #f47a9e;
  margin-bottom: 1rem;
  display: block;
  transform: rotate(45deg);
}

.offline-message h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.offline-message p {
  color: #666;
  margin-bottom: 1.5rem;
}

.retry-connection-btn {
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-connection-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(244, 122, 158, 0.3);
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 80px 0; /* Tetap berikan padding bawah pada mobile */
    min-height: 550px; /* Atur tinggi minimum untuk mobile */
  }

  .hero-content {
    padding: 1rem;
  }

  .page-title {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  .hero-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  .testing-section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-description {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .upload-container {
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .upload-box,
  .result-box,
  .info-box {
    padding: 1.8rem;
  }

  .info-box {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    margin: 2rem 1rem;
  }

  .info-content h3 {
    font-size: 1.5rem;
  }

  .info-content p {
    font-size: 1rem;
  }

  .benefits-grid {
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .benefit-card {
    padding: 1.8rem 1.5rem;
  }

  .benefit-icon {
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .benefit-card h3 {
    font-size: 1.3rem;
  }

  .benefit-card p {
    font-size: 1rem;
  }
}
</style>
