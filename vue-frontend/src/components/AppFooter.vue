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
          <p class="footer-desc">Skin Tone &amp; Undertone Detection powered by AI.<br>Capstone Project Dicoding Camp &mdash; Supported by DBS Foundation.</p>
          
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
              <router-link to="/testing" class="footer-link"><i class="fas fa-vial"></i> Detection</router-link>
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
.footer {
  position: relative;
  margin-top: 80px;
  color: var(--text-dark);
  z-index: 2;
  overflow: hidden;
  background: var(--bg-light);
}

.footer-wave {
  position: absolute;
  top: -120px;
  left: 0;
  width: 100%;
  line-height: 0;
  color: var(--bg-light);
  transform: rotate(180deg);
}

.footer-content {
  background: var(--bg-light);
  padding: 60px 0 40px 0;
  position: relative;
  z-index: 1;
}

.footer-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 60px;
  max-width: 1000px;
  margin: 0 auto;
}

.footer-brand {
  flex: 1;
  max-width: 400px;
  min-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.footer-logo .logo-icon {
  color: var(--accent);
  font-size: 24px;
}

.gradient-text {
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-desc {
  margin: 16px 0;
  font-size: 1rem;
  color: var(--text-light);
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--white);
  border-radius: 50%;
  color: var(--accent);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.social-link:hover {
  background: var(--accent);
  color: var(--white);
  transform: translateY(-3px);
}

.footer-links-container {
  display: flex;
  gap: 40px;
  flex: 1;
  justify-content: flex-start;
  max-width: 450px;
}

.footer-links-column h4 {
  font-size: 1.2rem;
  color: var(--text-dark);
  margin-bottom: 20px;
  font-weight: 600;
  position: relative;
}

.footer-links-column h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: var(--text-light);
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-link i {
  font-size: 0.9rem;
  color: var(--accent);
}

.footer-link:hover {
  color: var(--accent);
  transform: translateX(5px);
}

.footer-bottom {
  text-align: center;
  padding: 20px 0;
  font-size: 0.9rem;
  color: var(--text-light);
  background: var(--white);
  border-top: 1px solid rgba(0, 0, 0, 0.05);  position: relative;
  z-index: 1;
}

/* Desktop/Laptop optimized layout */
@media (min-width: 993px) {
  .footer-container {
    gap: 70px;
    max-width: 1050px;
    justify-content: space-between;
  }
  
  .footer-brand {
    max-width: 420px;
    flex: 0 0 auto;
  }
  
  .footer-links-container {
    gap: 45px;
    max-width: 480px;
    flex: 0 0 auto;
  }
}

/* Medium laptops */
@media (min-width: 769px) and (max-width: 992px) {
  .footer-container {
    gap: 50px;
    max-width: 900px;
    justify-content: space-between;
  }
  
  .footer-brand {
    max-width: 350px;
  }
  
  .footer-links-container {
    gap: 35px;
    max-width: 400px;
  }
}

@media (max-width: 992px) {
  .footer-container {
    justify-content: center;
    text-align: center;
    gap: 50px;
  }
  
  .footer-brand {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-links-container {
    gap: 40px;
    justify-content: center;
  }
  
  .footer-links-column h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

/* Tablet specific adjustments */
@media (max-width: 768px) and (min-width: 577px) {
  .footer-container {
    gap: 40px;
  }
  
  .footer-links-container {
    gap: 35px;
  }
}

@media (max-width: 768px) {
  .footer-wave {
    top: -60px;
  }
  
  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    text-align: center;
  }
  
  .footer-brand {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-links-container {
    gap: 40px;
    width: 100%;
    justify-content: space-around;
  }
  
  .footer-link:hover {
    transform: none;
  }
}

@media (max-width: 576px) {
  .footer-links-container {
    flex-direction: column;
    gap: 30px;
  }
}
</style>
