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
    </section>    <section class="features-section">
      <div class="container-fluid">
        <div class="section-header">
          <h2 class="section-title">Mengapa Menggunakan FineYourTone?</h2>
          <p class="section-subtitle">Solusi modern untuk analisis warna kulit yang akurat dan efisien</p>
        </div>
        <div class="features">
          <div class="feature-card">
            <div class="icon-container">
              <i class="fas fa-camera-retro"></i>
            </div>
            <h3>Deteksi Akurat</h3>
            <p>Teknologi deteksi warna kulit yang akurat dan terpercaya untuk hasil yang konsisten setiap saat</p>
          </div>
          
          <div class="feature-card">
            <div class="icon-container">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            <h3>Analisis Cepat</h3>
            <p>Hasil analisis warna kulit dalam hitungan detik dengan teknologi pemrosesan gambar yang canggih</p>
          </div>
          
          <div class="feature-card">
            <div class="icon-container">
              <i class="fas fa-star"></i>
            </div>
            <h3>Rekomendasi Produk</h3>
            <p>Dapatkan rekomendasi warna yang paling cocok sesuai dengan warna kulit Anda</p>
          </div>
        </div>
      </div>
    </section>    
    <section class="usage-section">
      <div class="container-fluid">
        <div class="section-header">
          <h2 class="section-title">Cara Penggunaan</h2>
          <p class="section-subtitle">Tiga langkah mudah untuk mengetahui tone kulit Anda</p>
        </div>
        <div class="steps">
          <div class="step" data-aos="fade-up" data-aos-delay="100">
            <div class="step-icon">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <div class="step-content">
              <div class="step-number">1</div>
              <img src="/img/kegunaan 1.jpg" alt="Upload Image" class="step-image" />
              <h3>Upload Foto</h3>
              <p>Unggah foto wajah Anda dengan pencahayaan yang baik untuk hasil analisis yang optimal</p>
            </div>
          </div>
          
          <div class="step" data-aos="fade-up" data-aos-delay="200">
            <div class="step-icon">
              <i class="fas fa-cogs"></i>
            </div>
            <div class="step-content">
              <div class="step-number">2</div>
              <img src="/img/kegunaan 2.jpg" alt="Processing" class="step-image" />
              <h3>Analisis AI</h3>
              <p>Algoritma AI kami akan menganalisis warna kulit Anda dengan akurat dalam hitungan detik</p>
            </div>
          </div>
          
          <div class="step" data-aos="fade-up" data-aos-delay="300">
            <div class="step-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="step-content">
              <div class="step-number">3</div>
              <img src="/img/kegunaan 3.jpg" alt="Results" class="step-image" />
              <h3>Hasil & Rekomendasi</h3>
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

<!-- CSS dipindahkan ke style.css -->
