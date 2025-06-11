import { createApp } from 'vue'
import '../styles/style.css'
import '../styles/header.css'
import App from './App.vue'
import router from './router'
import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
})

const app = createApp(App)
app.use(router)
app.mount('#app')