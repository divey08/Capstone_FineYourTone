<template>
  <div class="image-uploader" data-aos="fade-up">
    <div class="card">
      <div class="card-header">
        <h4>Upload Gambar untuk Prediksi</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="uploadImage">
          <div class="form-group">
            <div class="upload-area" 
                 :class="{ 'active': isDragging, 'has-image': imagePreview }"
                 @dragover.prevent="isDragging = true"
                 @dragleave.prevent="isDragging = false"
                 @drop.prevent="onDropFile"
                 @click="triggerFileInput">
              
              <div v-if="imagePreview" class="image-preview-container animate__animated animate__fadeIn">
                <img :src="imagePreview" alt="Preview" class="preview-image" />
                <div class="overlay">
                  <span class="change-text">Change Image</span>
                </div>
              </div>
              
              <div v-else class="upload-instructions">
                <div class="upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p class="drag-text">Drag & drop image here or click to browse</p>
              </div>
            </div>
            
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileChange" 
              accept="image/*"
              class="file-input"
              id="image-input"
            />
          </div>
          
          <transition name="fade" mode="out-in">
            <button 
              v-if="selectedFile"
              type="submit" 
              class="submit-btn" 
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="loading-spinner"></span>
              <span>{{ isLoading ? 'Processing...' : 'Analyze Image' }}</span>
            </button>
            <div v-else class="empty-btn-space"></div>
          </transition>
        </form>
      </div>
      
      <div v-if="selectedFile" class="selected-file-info animate__animated animate__fadeIn">
        <span class="file-name">{{ truncatedFileName }}</span>
        <button @click="resetForm" class="reset-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',
  data() {
    return {
      selectedFile: null,
      imagePreview: null,
      isLoading: false,
      isDragging: false
    }
  },
  computed: {
    truncatedFileName() {
      if (!this.selectedFile) return '';
      const name = this.selectedFile.name;
      return name.length > 20 ? name.substring(0, 17) + '...' : name;
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewImage(file);
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      if (!this.selectedFile) return;
      
      this.isLoading = true;
      const formData = new FormData();
      formData.append('my_image', this.selectedFile);
      
      // Emit event with form data for parent to handle
      this.$emit('upload', formData);
    },
    onDropFile(e) {
      this.isDragging = false;
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.selectedFile = file;
        this.previewImage(file);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    resetForm() {
      this.selectedFile = null;
      this.imagePreview = null;
      this.$refs.fileInput.value = '';
    }
  }
}
</script>

<style scoped>
.image-uploader {
  width: 100%;
  transition: all 0.3s ease;
}

.card {
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  background-color: var(--background-white);
  transition: transform 0.3s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 20px;
  text-align: center;
  color: white;
  border-bottom: none;
}

.card-header h4 {
  margin: 0;
  font-weight: 700;
  font-size: 22px;
}

.card-body {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-area {
  width: 280px;
  height: 280px;
  border: 2px dashed var(--primary-light);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  background-color: rgba(161, 226, 237, 0.1);
}

.upload-area:hover {
  border-color: var(--primary-color);
  background-color: rgba(161, 226, 237, 0.15);
}

.upload-area.active {
  border-color: var(--primary-color);
  background-color: rgba(161, 226, 237, 0.2);
}

.upload-area.has-image {
  border: none;
  background: none;
}

.image-preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-preview-container:hover .overlay {
  opacity: 1;
}

.change-text {
  color: white;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 15px;
  border-radius: 20px;
}

.upload-instructions {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.upload-icon {
  color: var(--primary-color);
  margin-bottom: 15px;
}

.drag-text {
  color: var(--text-light);
  text-align: center;
  font-size: 16px;
  max-width: 200px;
}

.file-input {
  display: none;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(85, 82, 238, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(85, 82, 238, 0.5);
}

.submit-btn:disabled {
  background: #b8b8b8;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.empty-btn-space {
  height: 45px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  margin-right: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.selected-file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  font-size: 14px;
}

.file-name {
  color: var(--text-dark);
  font-weight: 500;
}

.reset-btn {
  background: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  box-shadow: none;
}

.reset-btn:hover {
  color: var(--accent-color);
  background: transparent;
  transform: none;
  box-shadow: none;
}

/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
