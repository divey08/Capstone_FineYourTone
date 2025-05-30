<template>
  <div class="home">
    <section class="hero-section">
      <div class="container-fluid">
        <div class="hero-content">
          <h1>FineYour<span>Tone</span></h1>
          <p class="hero-tagline">Skin Tone Detection yang memudahkan Anda mengenali warna kulit secara akurat</p>
          <div class="hero-buttons">
            <router-link to="/testing" class="btn-primary"><i class="fas fa-camera"></i> Coba Sekarang</router-link>
            <router-link to="/explore-undertone" class="btn-secondary"><i class="fas fa-info-circle"></i> Pelajari Lebih Lanjut</router-link>
          </div>
        </div>
      </div>
      <div class="hero-overlay"></div>
    </section>    <section class="features-section" data-aos="fade-up">
      <div class="container-fluid">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Mengapa Menggunakan FineYourTone?</h2>
          <p class="section-subtitle">Solusi modern untuk analisis warna kulit yang akurat dan efisien</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-wrapper">
              <div class="icon-container">
                <i class="fas fa-microscope"></i>
              </div>
            </div>
            <h3>Deteksi AI Akurat</h3>
            <p>Menggunakan model AI Faster R-CNN yang akurat dan terpercaya untuk hasil analisis yang konsisten</p>
            <div class="feature-hover">
              <i class="fas fa-check-circle"></i>
              <span>99% Akurat</span>
            </div>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-wrapper">
              <div class="icon-container">
                <i class="fas fa-bolt"></i>
              </div>
            </div>
            <h3>Proses Instan</h3>
            <p>Hasil analisis warna kulit dalam hitungan detik dengan teknologi machine learning canggih</p>
            <div class="feature-hover">
              <i class="fas fa-clock"></i>
              <span>< 2 Detik</span>
            </div>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-wrapper">
              <div class="icon-container">
                <i class="fas fa-palette"></i>
              </div>
            </div>
            <h3>Rekomendasi Produk</h3>
            <p>Dapatkan rekomendasi makeup dan skincare yang paling sesuai dengan warna kulit Anda</p>
            <div class="feature-hover">
              <i class="fas fa-thumbs-up"></i>
              <span>100% Sesuai</span>
            </div>
          </div>

          <div class="feature-card" data-aos="zoom-in" data-aos-delay="400">
            <div class="icon-wrapper">
              <div class="icon-container">
                <i class="fas fa-shield-alt"></i>
              </div>
            </div>
            <h3>Aman & Privat</h3>
            <p>Privasi terjamin dengan pemrosesan lokal dan tidak ada penyimpanan foto pengguna</p>
            <div class="feature-hover">
              <i class="fas fa-lock"></i>
              <span>100% Aman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="usage-section">
      <div class="container-fluid">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Cara Penggunaan</h2>
          <p class="section-subtitle">Tiga langkah mudah untuk mengetahui tone kulit Anda</p>
        </div>
        <div class="usage-steps">
          <div class="usage-card" data-aos="fade-up" data-aos-delay="100">
            <div class="usage-icon-wrapper">
              <div class="usage-icon-container">
                <i class="fas fa-camera-retro"></i>
              </div>
              <div class="step-number">1</div>
            </div>
            <div class="usage-content">
              <h3>Upload Foto</h3>
              <div class="usage-image-container">
                <img src="/img/kegunaan 1.jpg" alt="Upload Image" class="usage-image" />
              </div>
              <p>Unggah foto wajah Anda dengan pencahayaan yang baik untuk hasil analisis yang optimal</p>
            </div>
          </div>
          
          <div class="usage-card" data-aos="fade-up" data-aos-delay="200">
            <div class="usage-icon-wrapper">
              <div class="usage-icon-container">
                <i class="fas fa-wand-magic-sparkles"></i>
              </div>
              <div class="step-number">2</div>
            </div>
            <div class="usage-content">
              <h3>Analisis AI</h3>
              <div class="usage-image-container">
                <img src="/img/kegunaan 2.jpg" alt="Processing" class="usage-image" />
              </div>
              <p>Algoritma AI kami akan menganalisis warna kulit Anda dengan akurat dalam hitungan detik</p>
            </div>
          </div>
          
          <div class="usage-card" data-aos="fade-up" data-aos-delay="300">
            <div class="usage-icon-wrapper">
              <div class="usage-icon-container">
                <i class="fas fa-palette"></i>
              </div>
              <div class="step-number">3</div>
            </div>
            <div class="usage-content">
              <h3>Hasil & Rekomendasi</h3>
              <div class="usage-image-container">
                <img src="/img/kegunaan 3.jpg" alt="Results" class="usage-image" />
              </div>
              <p>Dapatkan hasil analisis warna kulit dan rekomendasi produk yang sesuai dengan tone kulit Anda</p>
            </div>
          </div>
        </div>
      </div>    </section>
    
    <!-- CTA Section -->
    <section class="cta-section" data-aos="fade-up">
      <div class="container-fluid">
        <div class="cta-container">
          <div class="cta-content">
            <h2>Mulai Mendeteksi Tone Kulit Anda</h2>
            <p>Temukan pilihan makeup dan skincare yang tepat untuk warna kulit Anda</p>
            <div class="cta-buttons">
              <router-link to="/testing" class="cta-button primary">
                <i class="fas fa-camera"></i> Deteksi Sekarang
              </router-link>
              <router-link to="/explore-undertone" class="cta-button secondary">
                <i class="fas fa-info-circle"></i> Pelajari Undertone
              </router-link>
            </div>
          </div>
          <div class="cta-decoration">
            <div class="decoration-circle"></div>
            <div class="decoration-circle"></div>
            <div class="decoration-circle"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.features-section {
  padding: 80px 0;
  background: #fff;
  position: relative;
  overflow: hidden;
}

.features-section::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(231, 84, 128, 0.1) 0%, rgba(231, 84, 128, 0) 70%);
  top: -150px;
  right: -150px;
  border-radius: 50%;
}

.features-section::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(44, 62, 80, 0.1) 0%, rgba(44, 62, 80, 0) 70%);
  bottom: -150px;
  left: -150px;
  border-radius: 50%;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #2c3e50, #e75480);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.feature-card {
  background: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(231, 84, 128, 0.1);
}

.icon-wrapper {
  margin-bottom: 20px;
  position: relative;
}

.icon-container {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.icon-container i {
  font-size: 32px;
  color: #fff;
  transition: all 0.3s ease;
}

.feature-card:hover .icon-container {
  transform: rotate(360deg);
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 15px 0;
  font-weight: 600;
}

.feature-card p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.feature-hover {
  background: rgba(231, 84, 128, 0.1);
  padding: 8px 15px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #f392af;
  margin-top: auto;
  transition: all 0.3s ease;
}

.feature-hover i {
  font-size: 14px;
}

.feature-card:hover .feature-hover {
  background: #fa87aa;
  color: #fff;
  transform: translateY(-5px);
}

.usage-section {
  padding: 80px 0;
  background: #ffffff;
}

.section-title {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: #6c757d;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.usage-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.usage-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.usage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.usage-icon-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.usage-icon-container {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.usage-card:hover .usage-icon-container {
  transform: rotate(360deg);
}

.usage-icon-container i {
  font-size: 30px;
  color: white;
}

.step-number {
  position: absolute;
  top: -10px;
  right: 35%;
  background: #ffa4b8;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border: 3px solid white;
}

.usage-content {
  text-align: center;
}

.usage-content h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.usage-image-container {
  margin: 1.5rem 0;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.usage-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.usage-card:hover .usage-image {
  transform: scale(1.05);
}

.usage-content p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 0;
}

.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #fff5f8 0%, #fff 100%);
  position: relative;
  overflow: hidden;
}

.cta-container {
  background: linear-gradient(135deg, #f47a9e 0%, #f6bdd9 100%);
  border-radius: 30px;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(244, 122, 158, 0.15);
  max-width: 1200px;
  margin: 0 auto;
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-content h2 {
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-button.primary {
  background: #fff;
  color: #f47a9e;
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  backdrop-filter: blur(5px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

.cta-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.decoration-circle:nth-child(1) {
  width: 200px;
  height: 200px;
  top: -100px;
  right: -50px;
}

.decoration-circle:nth-child(2) {
  width: 150px;
  height: 150px;
  bottom: -50px;
  left: -30px;
}

.decoration-circle:nth-child(3) {
  width: 100px;
  height: 100px;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}

@media (max-width: 991px) {
  .features-section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid {
    gap: 20px;
  }
  
  .usage-steps {
    gap: 30px;
  }
  
  .usage-card {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .feature-card {
    padding: 25px;
  }
  
  .icon-container {
    width: 70px;
    height: 70px;
  }
  
  .icon-container i {
    font-size: 28px;
  }
  
  .usage-steps {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .usage-card {
    padding: 1.5rem;
  }

  .cta-container {
    padding: 40px 20px;
    margin: 0 20px;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-content p {
    font-size: 1rem;
  }

  .cta-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>
