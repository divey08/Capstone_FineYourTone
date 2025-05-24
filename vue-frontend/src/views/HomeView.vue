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

<style scoped>
.home {
  padding-top: 80px;
}

.hero-section {
  background: linear-gradient(135deg, #0ea2bd, #5552ee);
  color: white;
  padding: 100px 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background-color: white;
  color: #0ea2bd;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.section-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 50px;
  color: #333;
}

.features-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.features {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.feature-card {
  flex: 1;
  min-width: 250px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  text-align: center;
}

.icon {
  font-size: 40px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #0ea2bd;
}

.usage-section {
  padding: 80px 0;
}

.steps {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
}

.step {
  flex: 1;
  min-width: 250px;
  text-align: center;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0ea2bd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.step-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.step h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .features, .steps {
    flex-direction: column;
  }
  
  .hero-content h1 {
    font-size: 36px;
  }
  
  .hero-content p {
    font-size: 18px;
  }
}
</style>
