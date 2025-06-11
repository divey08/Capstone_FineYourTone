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
            <h3>Deteksi Akurat</h3>
            <p>Menggunakan sistem deteksi yang akurat dan terpercaya untuk memberikan hasil analisis yang konsisten.</p>
            <div class="feature-hover">
              <i class="fas fa-check-circle"></i>
              <span>80% Akurat</span>
            </div>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-wrapper">
              <div class="icon-container">
                <i class="fas fa-bolt"></i>
              </div>
            </div>
            <h3>Proses Cepat</h3>
            <p>Dapatkan hasil analisis warna kulit secara cepat tanpa perlu menunggu lama.</p>
            <div class="feature-hover">
              <i class="fas fa-clock"></i>
              <span>< 5 Detik</span>
            </div>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-wrapper">
              <div class="icon-container">
                <i class="fas fa-palette"></i>
              </div>
            </div>
            <h3>Rekomendasi Produk</h3>
            <p>Dapatkan rekomendasi warna yang paling sesuai dengan warna kulit Anda.</p>
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
              <h3>Analisis</h3>
              <div class="usage-image-container">
                <img src="/img/kegunaan 2.jpg" alt="Processing" class="usage-image" />
              </div>
             <p>Proses analisis warna kulit dilakukan secara cepat dan akurat untuk memberikan hasil terbaik.</p>
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
              <p>Dapatkan hasil analisis warna kulit beserta rekomendasi warna yang sesuai dengan tone kulit Anda.</p>
            </div>
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
/* CSS telah dipindahkan ke folder styles/style.css */
</style>
