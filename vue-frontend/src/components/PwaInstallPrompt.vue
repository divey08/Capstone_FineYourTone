<template>
  <div v-if="showInstallPrompt" class="pwa-install-prompt">
    <div class="prompt-container">
      <div class="prompt-content">
        <div class="prompt-icon">
          <i class="fas fa-mobile-alt"></i>
        </div>        <div class="prompt-text">
          <h4>Instal FineYourTone</h4>
          <p>Pasang aplikasi untuk pengalaman lebih baik</p>
        </div>
        <div class="prompt-actions">
          <button @click="installPwa" class="install-btn">
            Instal Sekarang
          </button>
          <button @click="dismissPrompt" class="dismiss-btn">
            Nanti
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PwaInstallPrompt',
  data() {
    return {
      deferredPrompt: null,
      showInstallPrompt: false
    }
  },
  mounted() {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      this.deferredPrompt = e
      // Update UI to notify the user they can install the PWA
      this.showInstallPrompt = true
    })

    // Check if user already dismissed or installed
    const promptDismissed = localStorage.getItem('pwa-prompt-dismissed')
    if (promptDismissed) {
      const dismissedDate = new Date(parseInt(promptDismissed))
      const now = new Date()
      // Show again after 7 days
      if ((now - dismissedDate) > (7 * 24 * 60 * 60 * 1000)) {
        localStorage.removeItem('pwa-prompt-dismissed')
      } else {
        this.showInstallPrompt = false
      }
    }
  },
  methods: {
    async installPwa() {
      if (!this.deferredPrompt) {
        return
      }
      // Show the install prompt
      this.deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice
      // We no longer need the prompt. Clear it up
      this.deferredPrompt = null
      // Hide the install button
      this.showInstallPrompt = false
      
      console.log(`User response to the install prompt: ${outcome}`)
    },
    dismissPrompt() {
      this.showInstallPrompt = false
      // Remember user dismissed for 7 days
      localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
    }
  }
}
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 15px;
  background-color: rgba(244, 122, 158, 0.05);
  animation: slide-up 0.5s ease;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.prompt-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(244, 122, 158, 0.2);
  overflow: hidden;
}

.prompt-content {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  flex-wrap: wrap;
}

.prompt-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border-radius: 50%;
  margin-right: 15px;
  flex-shrink: 0;
}

.prompt-icon i {
  font-size: 24px;
  color: white;
}

.prompt-text {
  flex: 1;
  min-width: 160px;
}

.prompt-text h4 {
  margin: 0 0 5px 0;
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.prompt-text p {
  margin: 0 0 8px;
  color: #666;
  font-size: 14px;
}

.benefits-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.benefits-list li {
  font-size: 12px;
  color: #777;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.benefits-list li i {
  color: #4caf50;
  font-size: 10px;
  margin-right: 5px;
}

.prompt-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 15px;
  gap: 10px;
  flex-wrap: wrap;
}

.install-btn {
  padding: 10px 15px;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.install-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 122, 158, 0.3);
}

.dismiss-btn {
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #777;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dismiss-btn:hover {
  background-color: #f5f5f5;
}

@media (max-width: 480px) {
  .prompt-content {
    flex-direction: column;
    text-align: center;
  }
  
  .prompt-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .prompt-actions {
    margin-top: 15px;
    margin-left: 0;
    width: 100%;
    justify-content: center;
    padding-left: 0;
  }
}
</style>
