<template>
  <div class="feedback container">
    <h1 class="page-title">Feedback</h1>
    <p class="subtitle">Bantu kami meningkatkan FineYourTone dengan masukan Anda</p>

    <div v-if="error" class="error-message" data-aos="fade-in">
      {{ error }}
    </div>

    <div class="feedback-form-container" data-aos="fade-up">
      <form @submit.prevent="submitFeedback" class="feedback-form" v-if="!submitted">
        <div class="form-group">
          <label for="name">Nama</label>
          <input type="text" id="name" v-model="newFeedback.name" placeholder="Nama Anda" required>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="newFeedback.email" placeholder="email@example.com" required>
        </div>
        
        <div class="form-group">
          <label for="rating">Rating</label>
          <div class="star-rating">
            <span 
              v-for="star in 5" 
              :key="star" 
              @click="newFeedback.rating = star"
              :class="{ 'active': newFeedback.rating >= star }"
              class="star"
            >★</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="category">Kategori Feedback</label>
          <select id="category" v-model="newFeedback.category" required>
            <option value="">-- Pilih Kategori --</option>
            <option value="UI/Desain">UI/Desain</option>
            <option value="Fitur Aplikasi">Fitur Aplikasi</option>
            <option value="Akurasi Deteksi">Akurasi Deteksi</option>
            <option value="Konten">Konten</option>
            <option value="Keluhan">Keluhan</option>
            <option value="Saran">Saran</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">Pesan Feedback</label>
          <textarea 
            id="message" 
            v-model="newFeedback.message" 
            placeholder="Ceritakan pengalaman Anda menggunakan FineYourTone atau sarankan fitur baru..."
            rows="5"
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Mengirim...' : 'Kirim Feedback' }}
        </button>
      </form>

      <div v-if="submitted" class="success-message" data-aos="fade-in">
        <div class="success-icon">✓</div>
        <h3>Terima Kasih!</h3>
        <p>Feedback Anda telah berhasil dikirim dan ditampilkan di bawah.</p>
        <button @click="resetForm" class="reset-button">Kirim Feedback Lain</button>
      </div>
    </div>

    <section class="user-feedbacks-section" v-if="userFeedbacks.length > 0 || isLoading">
      <h2>Feedback Pengguna</h2>
      
      <div v-if="isLoading" class="loading-spinner">
        Loading...
      </div>

      <div v-else class="user-feedbacks-grid">
        <div 
          v-for="(feedback, index) in userFeedbacks" 
          :key="index"
          class="feedback-card"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="feedback-header">
            <div>
              <h3>{{ feedback.name }}</h3>
              <p class="feedback-email">{{ feedback.email }}</p>
            </div>
            <div class="feedback-category">{{ feedback.category }}</div>
          </div>
          
          <div class="feedback-rating">
            <span v-for="star in 5" :key="star" :class="{ 'active': feedback.rating >= star }">★</span>
          </div>
          
          <p class="feedback-message">{{ feedback.message }}</p>
          
          <p class="feedback-date">{{ feedback.date }}</p>
        </div>
      </div>
    </section>

   
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  data() {
    return {
      newFeedback: {
        name: '',
        email: '',
        rating: 0,
        category: '',
        message: ''
      },
      userFeedbacks: [],
      isSubmitting: false,
      submitted: false,
      error: null,
      isLoading: false
    }
  },  
  mounted() {
    this.loadFeedbacks();
    // Pastikan style.css diimport secara global
  },  
  methods: {async loadFeedbacks() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch('http://localhost:5000/api/feedback');
        if (!response.ok) {
          throw new Error('Failed to load feedback data');
        }
        const data = await response.json();
        this.userFeedbacks = data;
      } catch (error) {
        console.error('Error loading feedbacks:', error);
        this.error = 'Gagal memuat data feedback. Silakan coba lagi.';
      } finally {
        this.isLoading = false;
      }
    },    async submitFeedback() {
      if (this.newFeedback.rating === 0) {
        this.error = 'Silakan berikan rating terlebih dahulu';
        return;
      }
      
      this.isSubmitting = true;
      this.error = null;
      
      try {
        const response = await fetch('http://localhost:5000/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.newFeedback.name,
            email: this.newFeedback.email,
            rating: this.newFeedback.rating,
            category: this.newFeedback.category,
            message: this.newFeedback.message
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Gagal mengirim feedback');
        }

        // Add the new feedback to the list and show success
        this.userFeedbacks.unshift(data);
        this.isSubmitting = false;
        this.submitted = true;

        // Scroll ke bagian feedback terbaru
        this.$nextTick(() => {
          const feedbackSection = document.querySelector('.user-feedbacks-section');
          if (feedbackSection) {
            feedbackSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      } catch (error) {
        console.error('Error submitting feedback:', error);
        this.isSubmitting = false;
        this.error = 'Gagal mengirim feedback. Silakan coba lagi.';
      }
    },    resetForm() {
      this.newFeedback = {
        name: '',
        email: '',
        rating: 0,
        category: '',
        message: ''
      };
      this.error = null;
      this.submitted = false;
    }
  }
}
</script>

<style scoped>
/* CSS telah dipindahkan ke file style.css */
</style>
