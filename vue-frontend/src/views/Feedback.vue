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
          <input 
            type="text" 
            id="name" 
            v-model="newFeedback.name" 
            placeholder="Nama Anda" 
            required
            :class="{ 'error': formErrors.name }"
          >
          <small v-if="formErrors.name" class="error-text">{{ formErrors.name }}</small>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="newFeedback.email" 
            placeholder="email@example.com" 
            required
            :class="{ 'error': formErrors.email }"
          >
          <small v-if="formErrors.email" class="error-text">{{ formErrors.email }}</small>
        </div>
        
        <div class="form-group">
          <label for="rating">Rating</label>
          <div class="star-rating" :class="{ 'error': formErrors.rating }">
            <span 
              v-for="star in 5" 
              :key="star" 
              @click="setRating(star)"
              :class="{ 'active': newFeedback.rating >= star }"
              class="star"
            >★</span>
          </div>
          <small v-if="formErrors.rating" class="error-text">{{ formErrors.rating }}</small>
        </div>
        
        <div class="form-group">
          <label for="category">Kategori Feedback</label>
          <select 
            id="category" 
            v-model="newFeedback.category" 
            required
            :class="{ 'error': formErrors.category }"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="UI/Desain">UI/Desain</option>
            <option value="Fitur Aplikasi">Fitur Aplikasi</option>
            <option value="Akurasi Deteksi">Akurasi Deteksi</option>
            <option value="Konten">Konten</option>
            <option value="Keluhan">Keluhan</option>
            <option value="Saran">Saran</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <small v-if="formErrors.category" class="error-text">{{ formErrors.category }}</small>
        </div>
        
        <div class="form-group">
          <label for="message">Pesan Feedback</label>
          <textarea 
            id="message" 
            v-model="newFeedback.message" 
            placeholder="Ceritakan pengalaman Anda menggunakan FineYourTone atau sarankan fitur baru..."
            rows="5"
            required
            :class="{ 'error': formErrors.message }"
          ></textarea>
          <small v-if="formErrors.message" class="error-text">{{ formErrors.message }}</small>
        </div>
        
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner"></span>
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
      
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Memuat feedback...</p>
      </div>

      <div v-else class="user-feedbacks-grid">
        <div 
          v-for="(feedback, index) in userFeedbacks" 
          :key="feedback.id || index"
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
          
          <p class="feedback-date">{{ formatDate(feedback.created_at || feedback.date) }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import supabase from '../supabase';

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
      formErrors: {
        name: '',
        email: '',
        rating: '',
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
  },  
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      
      // Check if dateString is already formatted
      if (typeof dateString === 'string' && dateString.includes(' ')) {
        return dateString;
      }
      
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        const options = { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit', 
          minute: '2-digit'
        };
        
        return date.toLocaleDateString('id-ID', options);
      } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
      }
    },
    
    setRating(value) {
      this.newFeedback.rating = value;
      this.formErrors.rating = '';
    },
    
    validateForm() {
      let isValid = true;
      this.formErrors = {
        name: '',
        email: '',
        rating: '',
        category: '',
        message: ''
      };
      
      if (!this.newFeedback.name.trim()) {
        this.formErrors.name = 'Harap masukkan nama Anda';
        isValid = false;
      }
      
      if (!this.newFeedback.email.trim()) {
        this.formErrors.email = 'Harap masukkan email Anda';
        isValid = false;
      } else if (!this.validateEmail(this.newFeedback.email)) {
        this.formErrors.email = 'Format email tidak valid';
        isValid = false;
      }
      
      if (this.newFeedback.rating === 0) {
        this.formErrors.rating = 'Harap berikan rating';
        isValid = false;
      }
      
      if (!this.newFeedback.category) {
        this.formErrors.category = 'Harap pilih kategori';
        isValid = false;
      }
      
      if (!this.newFeedback.message.trim()) {
        this.formErrors.message = 'Harap masukkan pesan feedback';
        isValid = false;
      } else if (this.newFeedback.message.length < 5) {
        this.formErrors.message = 'Pesan terlalu singkat';
        isValid = false;
      }
      
      return isValid;
    },
    
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
      async loadFeedbacks() {
      this.isLoading = true;
      this.error = null;
      try {
        // Direct Supabase query - note we're using the exact table name from the database
        const { data, error } = await supabase
          .from('feedback') // Make sure this matches your table name exactly
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Supabase error:', error);
          throw new Error(`Failed to load feedback: ${error.message || error.details || 'Unknown error'}`);
        }
        
        console.log('Loaded feedback data:', data);
        this.userFeedbacks = data || [];
      } catch (error) {
        console.error('Error loading feedbacks:', error);
        this.error = `Gagal memuat data feedback: ${error.message}`;
      } finally {
        this.isLoading = false;
      }
    },    async submitFeedback() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      this.error = null;
      
      try {
        // Prepare feedback data according to Supabase API documentation
        const feedbackData = {
          name: this.newFeedback.name,
          email: this.newFeedback.email,
          rating: this.newFeedback.rating,
          category: this.newFeedback.category,
          message: this.newFeedback.message
        };
        
        console.log('Submitting feedback:', feedbackData);
        
        // Insert data directly to Supabase using the documented API
        const { data, error } = await supabase
          .from('feedback')
          .insert([feedbackData])
          .select();
          
        if (error) {
          console.error('Supabase insert error:', error);
          throw new Error(`Failed to submit feedback: ${error.message || error.details || 'Unknown error'}`);
        }
        
        console.log('Feedback submission response:', data);
        
        // Add the new feedback to the list and show success
        if (data && data.length > 0) {
          this.userFeedbacks.unshift(data[0]);
          this.isSubmitting = false;
          this.submitted = true;
          
          // Reload all feedbacks to ensure we have the latest data
          await this.loadFeedbacks();
        } else {
          throw new Error('No data returned from database');
        }
        
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
        this.error = error.message || 'Gagal mengirim feedback. Silakan coba lagi.';
      }
    },
      resetForm() {
      this.newFeedback = {
        name: '',
        email: '',
        rating: 0,
        category: '',
        message: ''
      };
      this.formErrors = {
        name: '',
        email: '',
        rating: '',
        category: '',
        message: ''
      };
      this.error = null;
      this.submitted = false;
    },
      // Metode alternatif menggunakan upsert (untuk keperluan update di masa depan)
    async upsertFeedback(feedbackData, id = null) {
      try {
        let payload = { ...feedbackData };
        
        // Jika ID disediakan, gunakan untuk upsert
        if (id) {
          payload.id = id;
        }
        
        // Menggunakan upsert API seperti dalam dokumentasi
        const { data, error } = await supabase
          .from('feedback')
          .upsert(payload)
          .select();
          
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        console.error('Error upserting feedback:', error);
        return { data: null, error };
      }
    },
    
    // Metode untuk batch insert beberapa feedback sekaligus
    async batchInsertFeedback(feedbackItems) {
      try {
        // Contoh penggunaan:
        // this.batchInsertFeedback([
        //   { name: 'User 1', email: 'user1@example.com', rating: 5, category: 'Fitur Aplikasi', message: 'Bagus!' },
        //   { name: 'User 2', email: 'user2@example.com', rating: 4, category: 'UI/Desain', message: 'Keren' }
        // ]);
        
        const { data, error } = await supabase
          .from('feedback')
          .insert(feedbackItems)
          .select();
          
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        console.error('Error batch inserting feedback:', error);
        return { data: null, error };
      }
    }
  }
}
</script>

<style scoped>
.error-text {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
}

input.error, 
textarea.error, 
select.error, 
.star-rating.error {
  border-color: #e74c3c !important;
  box-shadow: 0 0 0 1px rgba(231, 76, 60, 0.2);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: var(--accent);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Additional styles for star rating */
.star-rating .star {
  cursor: pointer;
  font-size: 1.5rem;
  color: #ddd;
  transition: color 0.2s;
}

.star-rating .star.active {
  color: #f1c40f;
}

.star-rating .star:hover {
  color: #f39c12;
}

/* The rest of the CSS is in global style.css */
</style>
