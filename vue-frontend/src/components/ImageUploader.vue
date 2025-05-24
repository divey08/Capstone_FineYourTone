<template>
  <div class="image-uploader">
    <div class="card">
      <div class="card-header">
        <h4>Upload Gambar untuk Prediksi</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="uploadImage">
          <div class="form-group">
            <div class="image-preview">
              <img v-if="imagePreview" :src="imagePreview" alt="Preview" />
              <div v-else class="no-image">
                <span>No image selected</span>
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
            <label for="image-input" class="file-label">Pilih Gambar</label>
          </div>
          <button 
            type="submit" 
            class="submit-btn" 
            :disabled="!selectedFile || isLoading"
          >
            {{ isLoading ? 'Processing...' : 'Submit' }}
          </button>
        </form>
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
      isLoading: false
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
    }
  }
}
</script>

<style scoped>
.image-uploader {
  width: 100%;
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.card-header h4 {
  margin: 0;
  color: #333;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-preview {
  width: 200px;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 15px;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.no-image {
  color: #999;
  font-size: 14px;
}

.file-input {
  display: none;
}

.file-label {
  background-color: #0ea2bd;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: #0c8b9e;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #218838;
}

.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
