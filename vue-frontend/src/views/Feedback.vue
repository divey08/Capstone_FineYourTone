<template>
  <div class="feedback container">
    <h1 class="page-title">Feedback</h1>
    <p class="subtitle">Bantu kami meningkatkan FineYourTone dengan masukan Anda</p>

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

    <section class="user-feedbacks-section" v-if="userFeedbacks.length > 0">
      <h2>Feedback Pengguna</h2>
      <div class="user-feedbacks-grid">
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
        message: '',
        date: ''
      },
      userFeedbacks: [],
      isSubmitting: false,
      submitted: false,
      testimonials: [
       
      ]
    }
  },
  mounted() {
    // Load feedback dari localStorage jika ada
    const savedFeedbacks = localStorage.getItem('userFeedbacks');
    if (savedFeedbacks) {
      this.userFeedbacks = JSON.parse(savedFeedbacks);
    }
  },
  methods: {    submitFeedback() {
      this.isSubmitting = true;
      
      // Simpan feedback baru
      const newFeedbackItem = { ...this.newFeedback };
      
      // Tambahkan tanggal
      const now = new Date();
      newFeedbackItem.date = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Simulasi pengiriman ke server
      setTimeout(() => {
        // Tambahkan ke array userFeedbacks di akhir array
        this.userFeedbacks.push(newFeedbackItem);
        
        // Simpan ke localStorage
        localStorage.setItem('userFeedbacks', JSON.stringify(this.userFeedbacks));
        
        this.isSubmitting = false;
        this.submitted = true;
        
        // Scroll ke bagian feedback terbaru
        this.$nextTick(() => {
          const feedbackSection = document.querySelector('.user-feedbacks-section');
          if (feedbackSection) {
            feedbackSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }, 1500);
    },
    resetForm() {
      this.newFeedback = {
        name: '',
        email: '',
        rating: 0,
        category: '',
        message: '',
        date: ''
      };
      this.submitted = false;
    }
  }
}
</script>

<style scoped>
.feedback.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 160px 20px 60px;
  min-height: 100vh;
  background-color: #ffffff;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: -40px;
  color: #333;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.feedback-form-container {
  max-width: 800px;
  margin: 0 auto 50px;
  padding: 40px;
  background: #ffffff;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.star-rating {
  display: flex;
  gap: 5px;
  font-size: 1.5rem;
}

.star {
  cursor: pointer;
  color: #ddd;
}

.star.active {
  color: #f47a9e;
}

.submit-button {
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
}

.success-message {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  color: #f47a9e;
  font-size: 3rem;
  margin-bottom: 20px;
}

.reset-button {
  background: white;
  color: #f47a9e;
  border: 1px solid #f47a9e;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
}

.user-feedbacks-section {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
}

.user-feedbacks-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.user-feedbacks-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feedback-card {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  background: #ffffff;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.feedback-category {
  color: #f47a9e;
  font-size: 0.9rem;
}

.feedback-rating {
  margin: 10px 0;
}

.feedback-message {
  color: #444;
  line-height: 1.6;
  margin: 15px 0;
}

.feedback-date {
  color: #888;
  font-size: 0.9rem;
  text-align: right;
}

.testimonials-section {
  padding: 40px 20px;
  background: #fff;
}

.testimonials-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.testimonials-grid {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.testimonial-card {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  background: #ffffff;
}

.testimonial-rating {
  margin-bottom: 10px;
}

.testimonial-text {
  color: #444;
  line-height: 1.6;
  margin: 10px 0;
}

.testimonial-name {
  color: #666;
  text-align: right;
}

@media (max-width: 768px) {
  .feedback.container {
    padding: 140px 15px 40px;
  }

  .page-title {
    font-size: 2.5rem;
    margin-top: -30px;
  }

  .feedback-form-container {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .feedback.container {
    padding: 120px 10px 30px;
  }

  .page-title {
    font-size: 2rem;
    margin-top: -20px;
  }

  .subtitle {
    font-size: 0.95rem;
  }
}
</style>
