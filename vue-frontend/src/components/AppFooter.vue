<template>
  <footer class="footer">
      <div class="footer-content">
      <div class="footer-container container-fluid">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="logo-wrapper">
              <i class="fas fa-palette logo-icon"></i>
              <div class="logo-circles">
                <span class="circle"></span>
                <span class="circle"></span>
                <span class="circle"></span>
              </div>
            </div>
            <div class="logo-text">
              <span class="fine">Fine<span class="your">Your</span></span>
              <span class="tone">Tone</span>
            </div>
          </div>
          <p class="footer-desc">Skin Tone &amp; Undertone Detection.<br>Capstone Project Dicoding Camp &mdash; Supported by DBS Foundation.</p>
          
          <div class="social-links">
            <a href="#" class="social-link instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link linkedin"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link github"><i class="fab fa-github"></i></a>
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
