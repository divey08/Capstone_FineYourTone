<template>
  <header 
    class="header" 
    :class="{ 'scrolled': scrolled }"
    v-bind:style="{ 
      backgroundColor: headerBgColor,
      boxShadow: headerShadow
    }"
  >
    <div class="container header-container">
      <router-link to="/" class="logo" data-aos="fade-right">
        <h1><span class="gradient-text">FineYour</span>Tone<span class="dot">.</span></h1>
      </router-link>
      
      <nav class="navbar" data-aos="fade-left">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/testing">Testing</router-link></li>
          <li><router-link to="/explore-undertone">Explore Undertone</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/feedback">Feedback</router-link></li>
        </ul>
        <button class="menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>

    <div class="mobile-menu" :class="{ 'mobile-menu-open': mobileMenuOpen }">
      <ul>
        <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
        <li><router-link to="/testing" @click="closeMobileMenu">Detection</router-link></li>
        <li><router-link to="/explore-undertone" @click="closeMobileMenu">Explore Undertone</router-link></li>
        <li><router-link to="/about" @click="closeMobileMenu">About Us</router-link></li>
        <li><router-link to="/feedback" @click="closeMobileMenu">Feedback</router-link></li>
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
  background: linear-gradient(120deg, rgba(255,255,255,0.85) 60%, rgba(255,214,236,0.95) 100%);
  box-shadow: 0 4px 24px 0 #ffd6ec33;
  border-bottom: 1.5px solid #ffd6ec88;
}

.header.scrolled {
  padding: 15px 0;
  background: linear-gradient(120deg, rgba(255,255,255,0.95) 60%, rgba(255,214,236,1) 100%);
  box-shadow: 0 10px 30px #ffd6ec55;
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
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, #e75480 0%, #ffd6ec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  background: linear-gradient(90deg, #e75480 0%, #ffd6ec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dot {
  color: #ff8ebf;
  font-size: 36px;
  position: relative;
  line-height: 0;
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
  color: #c23a7a;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s, background 0.3s;
  border-radius: 6px;
}

.navbar a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, #e75480 0%, #ffd6ec 100%);
  transition: width 0.3s;
}

.navbar a:hover, .navbar .router-link-active {
  color: #e75480;
  background: rgba(255,214,236,0.25);
}

.navbar a:hover:after, .navbar .router-link-active:after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-shadow: none;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background: #e75480;
  border-radius: 3px;
  transition: all 0.3s;
}

.mobile-menu {
  position: fixed;
  top: 75px;
  left: 0;
  width: 100%;
  background: linear-gradient(120deg, #fff 60%, #ffd6ec 100%);
  transform: translateY(-100%);
  opacity: 0;
  z-index: 999;
  transition: all 0.5s ease;
  padding: 20px 0;
  box-shadow: 0 10px 20px #ffd6ec33;
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
  color: #c23a7a;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  padding: 10px 20px;
  display: inline-block;
  border-radius: 6px;
  transition: color 0.3s, background 0.3s;
}

.mobile-menu a:hover, .mobile-menu .router-link-active {
  color: #e75480;
  background: rgba(255,214,236,0.25);
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
