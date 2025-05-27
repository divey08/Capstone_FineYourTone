<template>
  <div class="explore-undertone container-fluid">
    <h1 class="page-title" data-aos="fade-down">Explore Undertone</h1>
    <p class="subtitle" data-aos="fade-up" data-aos-delay="100">Pelajari tentang berbagai undertone dan tipe warna kulit</p>

    <section class="undertone-section" data-aos="fade-up" data-aos-delay="200">
      <div class="icon-header">
        <i class="fas fa-search"></i>
        <h2>Apa itu Undertone?</h2>
      </div>
      <p>
        Undertone adalah warna dasar yang memengaruhi tampilan kulit Anda secara keseluruhan. Mengetahui undertone membantu Anda memilih makeup, pakaian, dan aksesori yang paling cocok.
      </p>
    </section>

    <section class="skin-types-section" data-aos="fade-up" data-aos-delay="300">
      <div class="icon-header">
        <i class="fas fa-palette"></i>
        <h2>Jenis Tone Kulit</h2>
      </div>
      <div class="skin-types-grid">
        <div class="skin-type-card" data-aos="zoom-in" data-aos-delay="400">
          <img src="/img/light skin.jpg" alt="Light Skin" class="skin-img" />
          <h3>Light Skin</h3>
          <p>Warna kulit terang dengan undertone pink, peach, atau netral. Biasanya mudah terbakar matahari.</p>
        </div>
        <div class="skin-type-card" data-aos="zoom-in" data-aos-delay="500">
          <img src="/img/fair skin.jpg" alt="Fair Skin" class="skin-img" />
          <h3>Fair Skin</h3>
          <p>Warna kulit sangat terang, seringkali dengan undertone dingin (cool) atau netral. Seringkali sensitif terhadap sinar matahari.</p>
        </div>
        <div class="skin-type-card" data-aos="zoom-in" data-aos-delay="600">
          <img src="/img/dark skin.jpg" alt="Dark Skin" class="skin-img" />
          <h3>Dark Skin</h3>
          <p>Warna kulit gelap dengan undertone hangat (warm), olive, atau netral. Biasanya lebih tahan terhadap paparan sinar matahari.</p>
        </div>
      </div>
    </section>

    <section class="tips-section" data-aos="fade-up" data-aos-delay="700">
      <div class="icon-header">
        <i class="fas fa-lightbulb"></i>
        <h2>Cara Mengetahui Undertone Anda</h2>
      </div>
      <ul>
        <li><i class="fas fa-check-circle"></i> Lihat warna urat nadi di pergelangan tangan: biru/ungu (cool), hijau (warm), sulit dibedakan (neutral).</li>
        <li><i class="fas fa-check-circle"></i> Perhatikan reaksi kulit terhadap matahari: mudah terbakar (cool/fair), mudah kecoklatan (warm/dark).</li>
        <li><i class="fas fa-check-circle"></i> Coba perhiasan: emas cocok untuk warm, perak cocok untuk cool.</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ExploreUndertone'
}
</script>

<!-- CSS dipindahkan ke style.css -->
