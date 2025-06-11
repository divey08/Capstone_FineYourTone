<template>
  <div class="explore-undertone container-fluid">
    <h1 class="page-title" data-aos="fade-down">Explore Undertone</h1>
    <p class="subtitle" data-aos="fade-up" data-aos-delay="100">Pahami jenis undertone kulitmu dan temukan warna makeup, outfit, dan aksesori yang paling cocok untuk tampilan terbaikmu!</p>    <section class="undertone-section animate-section" data-aos="fade-up" data-aos-delay="200">
      <div class="icon-header">
        <div class="icon-wrapper">
          <i class="fas fa-search animate-icon"></i>
        </div>
        <h2 class="animate-title">Apa itu Undertone?</h2>
      </div>
      <div class="content-wrapper">
        <p class="animate-text">
          Undertone adalah warna alami yang ada di bawah lapisan kulit Anda. Berbeda dengan warna kulit yang terlihat di permukaan, undertone adalah warna dasar yang memberikan nuansa khusus pada kulit Anda. Dengan mengetahui undertone, Anda dapat dengan mudah memilih warna makeup, pakaian, dan aksesori yang paling sesuai dan membuat penampilan Anda lebih memukau. Undertone adalah kunci untuk memahami mengapa beberapa warna terlihat lebih baik pada kulit Anda dibandingkan warna lainnya.
        </p>
      </div>
      <!-- Decorative elements -->
      <div class="glow-orb orb1"></div>
      <div class="glow-orb orb2"></div>
      <div class="glow-orb orb3"></div>
    </section>

    <section class="skin-types-section" data-aos="fade-up" data-aos-delay="300">
      <div class="icon-header">
        <i class="fas fa-palette"></i>
        <h2>Jenis Tone Kulit</h2>
      </div>      <div class="skin-types-grid">
        <div class="skin-type-card" data-aos="zoom-in" data-aos-delay="400">
          <div class="img-frame">
            <img src="/img/lightskin.jpg" alt="Light Skin" class="skin-img" />
          </div>
          <h3>Light Skin</h3>
          <p>Light skin sedikit lebih gelap dari fair skin, memiliki variasi undertone seperti warm, cool, atau neutral, dan cocok dengan banyak pilihan warna pakaian maupun makeup.</p>
        </div>
        <div class="skin-type-card" data-aos="zoom-in" data-aos-delay="500">
          <div class="img-frame">
            <img src="/img/fairskin.jpeg" alt="Fair Skin" class="skin-img" />
          </div>
          <h3>Fair Skin</h3>
          <p>Fair skin adalah warna kulit yang sangat terang dan mudah terbakar matahari, biasanya memiliki undertone pink (cool) atau kuning pucat (warm).</p>
        </div>
        <div class="skin-type-card" data-aos="zoom-in" data-aos-delay="600">
          <div class="img-frame">
            <img src="/img/darkskin.png" alt="Dark Skin" class="skin-img" />
          </div>
          <h3>Dark Skin</h3>
          <p>Dark skin memiliki pigmen tinggi, cenderung warm atau neutral, dan cocok dengan warna cerah atau metalik untuk tampilan yang kuat dan elegan.</p>
        </div>
      </div>
    </section>

    <section class="tips-section" data-aos="fade-up" data-aos-delay="700">
      <div class="icon-header">
        <i class="fas fa-lightbulb"></i>
        <h2>Cara Mengetahui Undertone Anda</h2>
      </div>      <div class="undertone-tips">
        <div class="tip-item">          <h3>🌟 1. Cek Warna Urat Nadi (Vein Test)</h3>
          <ul class="vein-test-results">
            <li><strong>Urat kehijauan</strong> → Warm undertone</li>
            <li><strong>Urat kebiruan atau ungu</strong> → Cool undertone</li>
            <li><strong>Campuran keduanya</strong> → Neutral undertone</li>
          </ul>
        </div>
        <div class="tip-item">
          <h3>🌞 2. Reaksi Kulit terhadap Sinar Matahari</h3>
          <ul>
            <li>Mudah terbakar, jadi kemerahan → <strong>Cool undertone</strong></li>
            <li>Cepat menggelap/tan → <strong>Warm undertone</strong></li>
            <li>Kadang terbakar, kadang tan → <strong>Neutral undertone</strong></li>
          </ul>
        </div>
        <div class="tip-item">          <h3>👚 3. Tes Warna Pakaian</h3>
          <ul>
            <li>Cocok dengan warna biru, ungu, silver → <strong>Cool undertone</strong></li>
            <li>Cocok dengan warna kuning, emas, oranye → <strong>Warm undertone</strong></li>
            <li>Cocok dengan semua warna → <strong>Neutral undertone</strong></li>
          </ul>
        </div>
        <div class="tip-item">
          <h3>💎 4. Tes Perhiasan</h3>
          <ul>
            <li>Cocok dengan perhiasan perak → <strong>Cool</strong></li>
            <li>Cocok dengan emas → <strong>Warm</strong></li>
            <li>Keduanya cocok → <strong>Neutral</strong></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ExploreUndertone'
}
</script>

<style scoped>
/* CSS telah dipindahkan ke folder styles/style.css */
</style>
