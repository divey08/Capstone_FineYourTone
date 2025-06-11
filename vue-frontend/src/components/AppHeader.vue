<template>  <header 
    class="header" 
    :class="{ 'scrolled': scrolled }"
  >    
    <div class="container-fluid header-container">
      <router-link to="/" class="logo" data-aos="fade-right">
        <h1><span class="gradient-text">FineYour</span>Tone</h1>
      </router-link>
      
      <nav class="navbar" data-aos="fade-left">
        <ul>
          <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
          <li><router-link to="/testing" class="main-feature">
            <i class="fas fa-camera"></i> Testing
          </router-link></li>
          <li><router-link to="/explore-undertone"><i class="fas fa-compass"></i> Explore</router-link></li>
          <li><router-link to="/about"><i class="fas fa-users"></i> About Us</router-link></li>
          <li><router-link to="/feedback"><i class="fas fa-heart"></i> Feedback</router-link></li>
        </ul>
        <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Toggle Menu">
          <i class="fas fa-bars"></i>
        </button>
      </nav>
    </div>

    <div class="mobile-menu" :class="{ 'mobile-menu-open': mobileMenuOpen }">      <ul>
        <li><router-link to="/" @click="closeMobileMenu"><i class="fas fa-home"></i> Home</router-link></li>        <li><router-link to="/testing" @click="closeMobileMenu" class="main-feature">
          <i class="fas fa-vial"></i> Testing
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
    });    return {
      scrolled,
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    };
  }
}
</script>

<style scoped>
/* CSS telah dipindahkan ke folder styles/style.css */

.header.scrolled {
  padding: 12px 0;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
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
  padding: 1rem 2rem;
  /* Menghapus background dan box-shadow di sini untuk menghindari tampilan bertumpuk */
}

.logo {
  text-decoration: none;
}

.logo h1 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  margin: 0;
  color: #333;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.gradient-text {
  background: linear-gradient(45deg, #f47a9e, #f6bdd9);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

.logo-icon {
  color: var(--accent);
  font-size: 24px;
  margin-right: 10px;
}

.navbar {
  ul {
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      a {
        text-decoration: none;
        color: #333;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        i {
          font-size: 1.1rem;
          color: #f47a9e;
        }

        &:hover {
          background: linear-gradient(45deg, #f47a9e, #f6bdd9);
          color: white;
          i {
            color: white;
          }
        }

        &.router-link-active {
          background: linear-gradient(45deg, #f47a9e, #f6bdd9);
          color: white;
          i {
            color: white;
          }
        }
      }
    }
  }
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
  background: linear-gradient(45deg, #f47a9e, #f6bdd9);
  color: white !important;
  box-shadow: 0 4px 12px rgba(244, 122, 158, 0.25);
  border: none;
  padding: 10px 20px;
  transition: all 0.3s ease;
  i {
    color: white !important;
  }
}

.navbar a.main-feature:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(244, 122, 158, 0.35);
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
  padding: 8px;
  box-shadow: none;
  color: #f47a9e;
  font-size: 24px;
  transition: color 0.3s;
  margin-left: auto;
}

.menu-toggle:hover {
  color: var(--accent);
}

.mobile-menu {
  position: fixed;
  top: 70px; /* Adjusted to match the shorter header */
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: rgba(255, 255, 255, 0.98);
  transform: translateX(-100%);
  opacity: 0;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  padding: 20px 0;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  visibility: hidden;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
}

.mobile-menu-open {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.mobile-menu li {
  margin: 15px 0;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
}

.mobile-menu-open li {
  opacity: 1;
  transform: translateX(0);
}

.mobile-menu li:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu li:nth-child(2) { transition-delay: 0.2s; }
.mobile-menu li:nth-child(3) { transition-delay: 0.3s; }
.mobile-menu li:nth-child(4) { transition-delay: 0.4s; }
.mobile-menu li:nth-child(5) { transition-delay: 0.5s; }

.mobile-menu a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 12px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  border-radius: 30px;
  margin: 0 20px;
}

.mobile-menu a i {
  font-size: 1.1rem;
  color: #f47a9e;
  transition: all 0.3s ease;
}

.mobile-menu a:hover {
  background: linear-gradient(45deg, #f47a9e, #f6bdd9);
  color: white;
}

.mobile-menu a:hover i {
  color: white;
}

.mobile-menu a.router-link-active {
  background: linear-gradient(45deg, #f47a9e, #f6bdd9);
  color: white;
}

.mobile-menu a.router-link-active i {
  color: white;
}

/* Main Feature Styling for Mobile */
.mobile-menu a.main-feature {
  background: linear-gradient(45deg, #f47a9e, #f6bdd9);
  color: white !important;
  font-weight: 700;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(244, 122, 158, 0.3);
  margin: 15px 20px;
  position: relative;
  overflow: hidden;
}

.mobile-menu a.main-feature i {
  color: white;
}

.mobile-menu a.main-feature:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 122, 158, 0.4);
}

@media (max-width: 768px) {
  .navbar ul {
    display: none;
  }
  
  .menu-toggle {
    display: block;
  }

  .header-container {
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
  }

  .logo {
    margin-bottom: 0 !important;
  }

  .logo h1 {
    font-size: 1.3rem;
    margin-bottom: 0;
  }

  .navbar {
    display: flex;
    justify-content: flex-end;
  }

  .navbar ul {
    display: none;
  }
}
</style>
