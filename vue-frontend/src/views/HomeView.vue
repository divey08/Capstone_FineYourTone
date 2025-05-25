<template>
  <div class="home">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>FineYourTone</h1>
          <p>Skin Tone Detection untuk membantu Anda menentukan warna kulit dengan teknologi AI</p>
          <router-link to="/testing" class="cta-button">Coba Sekarang</router-link>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Mengapa Menggunakan FineYourTone?</h2>
        <div class="features">
          <div class="feature-card">
            <div class="icon">📸</div>
            <h3>Deteksi Akurat</h3>
            <p>Menggunakan teknologi AI untuk mendeteksi warna kulit dengan akurasi tinggi</p>
          </div>
          
          <div class="feature-card">
            <div class="icon">🔍</div>
            <h3>Analisis Cepat</h3>
            <p>Hasil analisis warna kulit dalam hitungan detik</p>
          </div>
          
          <div class="feature-card">
            <div class="icon">✨</div>
            <h3>Rekomendasi Produk</h3>
            <p>Dapatkan rekomendasi produk kosmetik sesuai dengan warna kulit Anda</p>
          </div>
        </div>
      </div>
    </section>

    <section class="usage-section">
      <div class="container">
        <h2 class="section-title">Cara Penggunaan</h2>
        <div class="steps">          <div class="step">
            <div class="step-number">1</div>
            <img src="/img/kegunaan 1.jpg" alt="Upload Image" class="step-image" />
            <h3>Upload Foto</h3>
            <p>Unggah foto wajah Anda dengan pencahayaan yang baik</p>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <img src="/img/kegunaan 2.jpg" alt="Processing" class="step-image" />
            <h3>Analisis</h3>
            <p>Sistem akan menganalisis warna kulit Anda secara otomatis</p>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <img src="/img/kegunaan 3.jpg" alt="Results" class="step-image" />
            <h3>Hasil</h3>
            <p>Dapatkan hasil analisis warna kulit dan rekomendasi produk</p>
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
