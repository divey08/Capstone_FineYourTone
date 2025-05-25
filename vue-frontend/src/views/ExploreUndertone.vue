<template>
  <div class="explore-undertone container">
    <h1 class="page-title">Explore Undertone</h1>
    <p class="subtitle">Pelajari tentang berbagai undertone dan tipe warna kulit</p>

    <section class="undertone-section">
      <h2>Apa itu Undertone?</h2>
      <p>
        Undertone adalah warna dasar yang memengaruhi tampilan kulit Anda secara keseluruhan. Mengetahui undertone membantu Anda memilih makeup, pakaian, dan aksesori yang paling cocok.
      </p>
    </section>

    <section class="skin-types-section">
      <h2>Jenis Tone Kulit</h2>
      <div class="skin-types-grid">
        <div class="skin-type-card">
          <img src="/img/light skin.jpg" alt="Light Skin" class="skin-img" />
          <h3>Light Skin</h3>
          <p>Warna kulit terang dengan undertone pink, peach, atau netral. Biasanya mudah terbakar matahari.</p>
        </div>
        <div class="skin-type-card">
          <img src="/img/fair skin.jpg" alt="Fair Skin" class="skin-img" />
          <h3>Fair Skin</h3>
          <p>Warna kulit sangat terang, seringkali dengan undertone dingin (cool) atau netral. Seringkali sensitif terhadap sinar matahari.</p>
        </div>
        <div class="skin-type-card">
          <img src="/img/dark skin.jpg" alt="Dark Skin" class="skin-img" />
          <h3>Dark Skin</h3>
          <p>Warna kulit gelap dengan undertone hangat (warm), olive, atau netral. Biasanya lebih tahan terhadap paparan sinar matahari.</p>
        </div>
      </div>
    </section>

    <section class="tips-section">
      <h2>Cara Mengetahui Undertone Anda</h2>
      <ul>
        <li>Lihat warna urat nadi di pergelangan tangan: biru/ungu (cool), hijau (warm), sulit dibedakan (neutral).</li>
        <li>Perhatikan reaksi kulit terhadap matahari: mudah terbakar (cool/fair), mudah kecoklatan (warm/dark).</li>
        <li>Coba perhiasan: emas cocok untuk warm, perak cocok untuk cool.</li>
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
