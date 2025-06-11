import { createApp } from 'vue'
import '../styles/style.css'
import '../styles/header.css'
import App from './App.vue'
import router from './router'
import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './registerServiceWorker'

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
})

// Create the Vue app
const app = createApp(App)

// Configure offline behavior for router
router.beforeEach((to, from, next) => {
  // If we're offline and trying to access a page that needs internet
  if (!navigator.onLine && to.meta.requiresInternet) {
    // You could redirect to a specific offline page or show a notification
    console.log('Offline: Limited functionality available')
  }
  next()
})

// Add global offline state that can be accessed from any component
app.config.globalProperties.$offline = {
  isOffline: !navigator.onLine,
  checkConnection() {
    return navigator.onLine
  }
}

// Add event listeners for offline/online events at the app level
window.addEventListener('online', () => {
  app.config.globalProperties.$offline.isOffline = false
  console.log('Back online')
})

window.addEventListener('offline', () => {
  app.config.globalProperties.$offline.isOffline = true
  console.log('Went offline')
})

app.use(router)
app.mount('#app')