// src/registerServiceWorker.js
import { registerSW } from 'virtual:pwa-register'

// Menentukan apakah konten tertentu sudah di-cache untuk offline
const checkCachedContent = async () => {
  try {
    if (!('caches' in window)) {
      return false
    }
    
    // Memeriksa cache untuk file utama
    const cache = await caches.open('workbox-precache')
    const cachedFiles = await cache.keys()
    
    // Mengembalikan informasi status cache
    return cachedFiles.length > 0
  } catch (error) {
    console.error('Error checking cache:', error)
    return false
  }
}

// Fungsi untuk memastikan konten utama sudah di-cache untuk offline
const precacheImportantAssets = async () => {
  try {
    if (!('caches' in window)) {
      return
    }
    
    // Cache konten penting secara manual jika perlu
    const urlsToCache = [
      '/',
      '/index.html',
      '/offline.html',
      '/favicon.ico',
      '/img/icons/favicon-32x32.png',
      '/img/icons/android-chrome-192x192.png'
    ]
    
    const cache = await caches.open('pwa-assets')
    await cache.addAll(urlsToCache)
  } catch (error) {
    console.error('Error precaching assets:', error)
  }
}

// Fungsi yang berjalan saat service worker diperbarui
const updateSW = registerSW({
  onNeedRefresh() {
    // Jika service worker baru tersedia, tampilkan notifikasi untuk refresh
    if (confirm('Pembaruan aplikasi tersedia. Muat ulang sekarang?')) {
      updateSW()
    }
  },
  async onOfflineReady() {
    console.log('Aplikasi siap digunakan secara offline')
    
    // Memastikan konten utama sudah di-cache untuk offline
    await precacheImportantAssets()
    
    // Menampilkan notifikasi yang lebih user-friendly
    const offlineReadyEvent = new CustomEvent('offlineReady')
    window.dispatchEvent(offlineReadyEvent)
  },
  onRegisteredSW(swUrl, registration) {
    console.log('Service worker registered:', swUrl)
    
    // Menginisialisasi caching penting setelah pendaftaran
    precacheImportantAssets()
  },
  onRegisterError(error) {
    console.error('Service worker registration error:', error)
  }
})

export default registerSW
export { checkCachedContent }
