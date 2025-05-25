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

    <section class="testimonials-section">
      <h2>Apa Kata Pengguna Lain</h2>
      <div class="testimonials-grid">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          class="testimonial-card"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="testimonial-rating">
            <span v-for="star in 5" :key="star" :class="{ 'active': testimonial.rating >= star }">★</span>
          </div>
          <p class="testimonial-text">"{{ testimonial.message }}"</p>
          <p class="testimonial-name">- {{ testimonial.name }}</p>
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
        { name: 'Rina', rating: 5, message: 'Aplikasi ini sangat membantu saya menemukan foundation yang cocok!' },
        { name: 'Budi', rating: 4, message: 'Deteksi warna kulit sangat akurat, saya jadi tahu undertone saya.' },
        { name: 'Anisa', rating: 5, message: 'Rekomendasi produk kecantikan sangat sesuai dengan tone kulit saya.' }
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
  methods: {
    submitFeedback() {
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
        // Tambahkan ke array userFeedbacks
        this.userFeedbacks.unshift(newFeedbackItem);
        
        // Simpan ke localStorage
        localStorage.setItem('userFeedbacks', JSON.stringify(this.userFeedbacks));
        
        this.isSubmitting = false;
        this.submitted = true;
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

<!-- CSS dipindahkan ke style.css -->
