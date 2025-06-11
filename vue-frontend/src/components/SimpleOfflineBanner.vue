<template>
  <div v-if="!isOnline" class="offline-banner">
    <i class="offline-icon">📶</i>
    <span>Anda sedang offline. Beberapa fitur mungkin tidak tersedia.</span>
  </div>
</template>

<script>
export default {
  name: 'SimpleOfflineBanner',
  data() {
    return {
      isOnline: navigator.onLine
    }
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
    this.updateOnlineStatus()
  },
  beforeUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },
  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine
    }
  }
}
</script>

<style scoped>
.offline-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.offline-icon {
  font-size: 16px;
  margin-right: 5px;
  transform: rotate(45deg);
}
</style>
