<template>
  <footer class="footer">
    <div class="footer-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="currentColor" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,144C672,149,768,203,864,208C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
    
    <div class="footer-content">
      <div class="footer-container container-fluid">
        <div class="footer-brand">
          <div class="footer-logo">
            <i class="fas fa-palette logo-icon"></i>
            <span>FineYour<span class="gradient-text">Tone</span></span>
          </div>
          <p class="footer-desc">Skin Tone &amp; Undertone Detection.<br>Capstone Project Dicoding Camp &mdash; Supported by DBS Foundation.</p>
          
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
          </div>
        </div>
        
        <div class="footer-links-container">
          <div class="footer-links-column">
            <h4>Navigasi</h4>
            <div class="footer-links">
              <router-link to="/" class="footer-link"><i class="fas fa-home"></i> Home</router-link>
              <router-link to="/testing" class="footer-link"><i class="fas fa-vial"></i> Testing</router-link>
              <router-link to="/explore-undertone" class="footer-link"><i class="fas fa-star"></i> Explore</router-link>
              <router-link to="/about" class="footer-link"><i class="fas fa-users"></i> About Us</router-link>
              <router-link to="/feedback" class="footer-link"><i class="fas fa-comment"></i> Feedback</router-link>
            </div>
          </div>
          
          <div class="footer-links-column">
            <h4>Support</h4>
            <div class="footer-links">
              <a href="#" class="footer-link"><i class="fas fa-question-circle"></i> FAQ</a>
              <a href="#" class="footer-link"><i class="fas fa-book"></i> Documentation</a>
              <a href="#" class="footer-link"><i class="fas fa-envelope"></i> Contact Us</a>
              <a href="#" class="footer-link"><i class="fas fa-shield-alt"></i> Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="container-fluid">
        <span>&copy; {{ new Date().getFullYear() }} FineYourTone. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
/* CSS sudah dipindahkan ke style.css */
</style>
