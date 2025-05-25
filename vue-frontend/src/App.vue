<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<template>
  <div class="app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary-color: #0ea2bd;
  --primary-dark: #0a8a9f;
  --primary-light: #a1e2ed;
  --secondary-color: #5552ee;
  --secondary-dark: #4542c1;
  --accent-color: #ff7846;
  --text-dark: #222;
  --text-light: #777;
  --background-light: #f9f9f9;
  --background-white: #ffffff;
  --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --transition-fast: 0.3s cubic-bezier(.4,2,.6,1);
  --transition-medium: 0.5s cubic-bezier(.4,2,.6,1);
  --border-radius: 16px;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
  background: linear-gradient(120deg, #f9f9f9 60%, #e3f6f9 100%);
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(14,162,189,0.07);
  transition: transform 0.3s;
}
img:hover {
  transform: scale(1.03) rotate(-1deg);
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: color var(--transition-fast);
}
a:hover {
  color: var(--accent-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

button, .button {
  border: none;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 14px 32px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 16px rgba(14,162,189,0.13);
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}
button:after, .button:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  background: rgba(255,255,255,0.2);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
  z-index: 0;
}
button:hover:after, .button:hover:after {
  width: 200%;
  height: 500%;
}
button:hover, .button:hover {
  background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 24px rgba(14,162,189,0.18);
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s cubic-bezier(.4,2,.6,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(.4,2,.6,1);
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(.4,2,.6,1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(30px) scale(0.98);
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .container {
    max-width: 900px;
  }
}
@media (max-width: 768px) {
  .container {
    max-width: 98vw;
    padding: 0 10px;
  }
  .app {
    min-height: 100vh;
  }
  h1, h2, h3 {
    font-size: 1.3em;
  }
  button, .button {
    padding: 12px 18px;
    font-size: 0.98rem;
  }
}
@media (max-width: 480px) {
  .container {
    padding: 0 4vw;
  }
  h1, h2, h3 {
    font-size: 1.1em;
  }
  button, .button {
    padding: 10px 10px;
    font-size: 0.95rem;
  }
}
</style>
