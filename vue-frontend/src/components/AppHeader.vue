<template>
  <header 
    class="header" 
    :class="{ 'scrolled': scrolled }"
    v-bind:style="{ 
      backgroundColor: headerBgColor,
      boxShadow: headerShadow
    }"
  >    <div class="container-fluid header-container">
      <router-link to="/" class="logo" data-aos="fade-right">
        <h1><i class="fas fa-palette logo-icon"></i> <span class="gradient-text">FineYour</span>Tone</h1>
      </router-link>
      
      <nav class="navbar" data-aos="fade-left">        <ul>
          <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>          <li><router-link to="/testing" class="main-feature">
            <i class="fas fa-vial"></i> Testing
          </router-link></li>
          <li><router-link to="/explore-undertone"><i class="fas fa-star"></i> Explore</router-link></li>
          <li><router-link to="/about"><i class="fas fa-users"></i> About Us</router-link></li>
          <li><router-link to="/feedback"><i class="fas fa-comment"></i> Feedback</router-link></li>
        </ul>
        <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Toggle Menu">
          <i class="fas fa-bars"></i>
        </button>
      </nav>
    </div>

    <div class="mobile-menu" :class="{ 'mobile-menu-open': mobileMenuOpen }">      <ul>
        <li><router-link to="/" @click="closeMobileMenu"><i class="fas fa-home"></i> Home</router-link></li>        <li><router-link to="/testing" @click="closeMobileMenu" class="main-feature">
          <i class="fas fa-vial"></i> Detection
        </router-link></li>
        <li><router-link to="/explore-undertone" @click="closeMobileMenu"><i class="fas fa-star"></i> Explore</router-link></li>
        <li><router-link to="/about" @click="closeMobileMenu"><i class="fas fa-users"></i> About Us</router-link></li>
        <li><router-link to="/feedback" @click="closeMobileMenu"><i class="fas fa-comment"></i> Feedback</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';

export default {
  name: 'AppHeader',
  setup() {
    const scrolled = ref(false);
    const mobileMenuOpen = ref(false);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        scrolled.value = true;
      } else {
        scrolled.value = false;
      }
    };

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
      if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
      document.body.style.overflow = '';
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const headerBgColor = computed(() => {
      return scrolled.value ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.9)';
    });

    const headerShadow = computed(() => {
      return scrolled.value ? '0 10px 30px rgba(0, 0, 0, 0.1)' : 'none';
    });

    return {
      scrolled,
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      headerBgColor,
      headerShadow
    };
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 1000;
  transition: all 0.4s ease;
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header.scrolled {
  padding: 15px 0;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.container-fluid {
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  margin-right: auto;
  margin-left: auto;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
  color: var(--primary);
}

.gradient-text {
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-icon {
  color: var(--accent);
  font-size: 24px;
  margin-right: 10px;
}

.navbar ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar li {
  margin: 0 20px;
}

.navbar a {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  padding: 8px 16px;
  position: relative;
  transition: color 0.3s, background 0.3s;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar a i {
  font-size: 14px;
  transition: transform 0.3s;
}

.navbar a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
  transition: width 0.3s;
}

.navbar a:hover, .navbar .router-link-active {
  color: var(--accent);
  background: rgba(52, 152, 219, 0.08);
}

.navbar a:hover i, .navbar .router-link-active i {
  transform: scale(1.2);
}

.navbar a:hover:after, .navbar .router-link-active:after {
  width: 100%;
}

/* Main Feature Styling - Testing Link */
.navbar a.main-feature {
  background: rgba(52, 152, 219, 0.15);
  color: var(--accent) !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(52, 152, 219, 0.3);
  padding: 10px 18px;
  backdrop-filter: blur(4px);
}

.navbar a.main-feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.6s;
}

.navbar a.main-feature:hover::before {
  left: 100%;
}

.navbar a.main-feature:hover {
  background: rgba(52, 152, 219, 0.25);
  color: var(--accent) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
  border-color: rgba(52, 152, 219, 0.5);
}

.navbar a.main-feature i {
  color: var(--accent);
}

.navbar a.main-feature:after {
  display: none;
}

/* Feature Badge - Removed as requested */
/* 
.feature-badge {
  background: rgba(255, 255, 255, 0.9);
  color: var(--accent);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 6px;
  position: relative;
  top: -8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}
*/

.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-shadow: none;
  color: var(--primary);
  font-size: 24px;
  transition: color 0.3s;
}

.menu-toggle:hover {
  color: var(--accent);
}

.mobile-menu {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  transform: translateY(-100%);
  opacity: 0;
  z-index: 999;
  transition: all 0.5s ease;
  padding: 20px 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  visibility: hidden;
}

.mobile-menu-open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.mobile-menu li {
  margin: 20px 0;
}

.mobile-menu a {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  transition: all 0.3s;
}

.mobile-menu a:hover, .mobile-menu .router-link-active {
  color: var(--accent);
}

.mobile-menu a {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  padding: 10px 20px;
  display: inline-block;
  border-radius: 6px;
  transition: color 0.3s, background 0.3s;
}

.mobile-menu a:hover, .mobile-menu .router-link-active {
  color: var(--accent);
  background: rgba(52, 152, 219, 0.1);
}

/* Main Feature Styling for Mobile */
.mobile-menu a.main-feature {
  background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
  color: var(--white) !important;
  font-weight: 700;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(44, 62, 80, 0.3);
  margin: 15px 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 20px;
}

.mobile-menu a.main-feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.6s;
}

.mobile-menu a.main-feature:hover::before {
  left: 100%;
}

.mobile-menu a.main-feature:hover {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(44, 62, 80, 0.4);
}

.mobile-menu a.main-feature i {
  color: var(--white);
}

@media (max-width: 768px) {
  .navbar ul {
    display: none;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .logo h1 {
    font-size: 24px;
  }
}
</style>
