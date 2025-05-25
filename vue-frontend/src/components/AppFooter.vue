<template>
  <footer class="footer">
    <div class="footer-container container">
      <div class="footer-brand">
        <span class="footer-logo">FineYour<span class="footer-logo-accent">Tone</span></span>
        <p class="footer-desc">Skin Tone &amp; Undertone Detection powered by AI.<br>Capstone Project Dicoding Camp &mdash; Supported by DBS Foundation.</p>
      </div>
      <div class="footer-links">
        <router-link to="/" class="footer-link">Home</router-link>
        <router-link to="/testing" class="footer-link">Detection</router-link>
        <router-link to="/explore-undertone" class="footer-link">Explore Undertone</router-link>
        <router-link to="/about" class="footer-link">About Us</router-link>
        <router-link to="/contact" class="footer-link">Contact Us</router-link>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; {{ new Date().getFullYear() }} FineYourTone. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(120deg, #ffd6ec 0%, #fff 100%);
  color: #c23a7a;
  padding: 40px 0 0 0;
  margin-top: 60px;
  box-shadow: 0 -4px 24px #ffd6ec33;
  position: relative;
  z-index: 2;
  overflow: hidden;
}
.footer::before {
  content: '';
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  background: linear-gradient(120deg, #ffd6ec 0%, #fff 100%);
  opacity: 0.7;
  z-index: 0;
  animation: footerGradientMove 10s ease-in-out infinite alternate;
}
@keyframes footerGradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;
  padding-bottom: 16px;
  position: relative;
  z-index: 1;
}
.footer-brand {
  max-width: 340px;
}
.footer-logo {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #e75480;
}
.footer-logo-accent {
  color: #ff8ebf;
}
.footer-desc {
  margin: 12px 0 0 0;
  font-size: 1.05rem;
  color: #c23a7a;
  line-height: 1.5;
}
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-link {
  color: #c23a7a;
  font-size: 1.08rem;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
}
.footer-link:hover {
  color: #e75480;
  text-decoration: underline;
}
.footer-bottom {
  text-align: center;
  padding: 18px 0 10px 0;
  font-size: 1rem;
  color: #c23a7a;
  border-top: 1px solid #ffd6ec88;
  background: linear-gradient(120deg, #fff 0%, #ffd6ec 100%);
  position: relative;
  z-index: 1;
}
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 18px;
    text-align: center;
  }
  .footer-brand {
    max-width: 100%;
  }
}
</style>
