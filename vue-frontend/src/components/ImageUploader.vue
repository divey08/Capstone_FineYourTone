<template>
  <div class="image-uploader" data-aos="fade-up">
    <div class="card">
      <div class="card-header">
        <h4>Upload Gambar untuk Prediksi</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="uploadImage">
          <div class="form-group">
            <div
              class="upload-area"
              :class="{ active: isDragging, 'has-image': imagePreview }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onDropFile"
              @click="triggerFileInput">
              <div
                v-if="imagePreview"
                class="image-preview-container animate__animated animate__fadeIn">
                <img :src="imagePreview" alt="Preview" class="preview-image" />
                <div class="overlay">
                  <span class="change-text">Change Image</span>
                </div>
              </div>

              <div v-else class="upload-instructions">
                <div class="upload-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p class="drag-text">
                  Drag & drop image here or click to browse
                </p>
              </div>
            </div>

            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              accept="image/*"
              class="file-input"
              id="image-input" />

            <div class="upload-options">
              <button type="button" class="camera-btn" @click="openCamera">
                <i class="fas fa-camera"></i> Gunakan Kamera
              </button>
            </div>
          </div>

          <transition name="fade" mode="out-in">
            <button
              v-if="selectedFile"
              type="submit"
              class="submit-btn"
              :disabled="isLoading">
              <span v-if="isLoading" class="loading-spinner"></span>
              <span>{{ isLoading ? "Processing..." : "Analyze Image" }}</span>
            </button>
            <div v-else class="empty-btn-space"></div>
          </transition>
        </form>
      </div>

      <!-- Modal Kamera -->
      <div class="camera-modal" v-if="showCameraModal">
        <div class="camera-modal-content">
          <div class="camera-header">
            <h3>Ambil Foto</h3>
            <button class="close-btn" @click="closeCameraModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="camera-body">
            <div class="camera-status" v-if="cameraLoading">
              <div class="camera-loader"></div>
              <p>Memuat kamera...</p>
            </div>

            <div class="camera-error" v-if="cameraError">
              <i class="fas fa-exclamation-triangle"></i>
              <p>{{ cameraError }}</p>
              <button @click="retryCamera" class="retry-btn">
                <i class="fas fa-redo"></i> Coba Lagi
              </button>
            </div>

            <div class="camera-flash" v-if="showFlash"></div>
            <div
              class="countdown-overlay"
              v-if="countdownActive && !cameraError">
              <div class="countdown-value">{{ countdownValue }}</div>
            </div>

            <video
              ref="videoElement"
              autoplay
              playsinline
              v-show="!capturedImage && !cameraLoading && !cameraError"></video>
            <canvas ref="canvasElement" style="display: none"></canvas>

            <div
              class="camera-guide"
              v-if="!capturedImage && !cameraLoading && !cameraError">
              <div class="guide-oval"></div>
              <p class="guide-text">Posisikan wajah Anda di dalam area</p>
            </div>

            <div
              class="camera-toolbar"
              v-if="!capturedImage && !cameraLoading && !cameraError">
              <button
                class="switch-camera-btn"
                @click="switchCamera"
                v-if="hasMulitpleCameras">
                <i class="fas fa-sync-alt"></i>
              </button>
            </div>

            <div class="camera-controls">
              <div
                class="capture-options"
                v-if="!capturedImage && !cameraLoading && !cameraError">
                <button class="capture-btn" @click="startCountdown">
                  <i class="fas fa-camera"></i>
                </button>
                <div class="capture-mode">
                  <button class="timer-toggle" @click="toggleTimer">
                    <i class="fas fa-clock"></i>
                    <span>{{
                      countdownValue > 0 ? countdownValue + "s" : "Off"
                    }}</span>
                  </button>
                </div>
              </div>

              <button
                v-if="capturedImage"
                class="accept-btn"
                @click="acceptImage">
                <i class="fas fa-check"></i> Gunakan
              </button>
              <button
                v-if="capturedImage"
                class="retake-btn"
                @click="retakeImage">
                <i class="fas fa-redo"></i> Ambil Ulang
              </button>
            </div>

            <!-- Countdown Timer -->
            <div v-if="countdownActive" class="countdown-timer">
              <p class="countdown-text">{{ countdownValue }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="selectedFile"
        class="selected-file-info animate__animated animate__fadeIn">
        <span class="file-name">{{ truncatedFileName }}</span>
        <button @click="resetForm" class="reset-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUploader",
  data() {
    return {
      selectedFile: null,
      imagePreview: null,
      isLoading: false,
      isDragging: false,
      showCameraModal: false,
      videoStream: null,
      capturedImage: null,
      cameraLoading: false,
      currentFacingMode: "user", // 'user' untuk kamera depan, 'environment' untuk belakang
      hasMulitpleCameras: false,
      showFlash: false,
      countdownActive: false,
      countdownValue: 3,
      cameraError: null,
    };
  },
  computed: {
    truncatedFileName() {
      if (!this.selectedFile) return "";
      const name = this.selectedFile.name;
      return name.length > 20 ? name.substring(0, 17) + "..." : name;
    },
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

      // Create a form data object with the image file
      const formData = new FormData();

      // Make sure the file is properly named with an extension
      const file = this.selectedFile;
      const fileName = file.name || "image.jpg";

      // Append the file to the form data with the key "image" as expected by the backend
      formData.append("image", file, fileName);

      // Emit event with form data for parent to handle
      this.$emit("upload", formData);
    },
    onDropFile(e) {
      this.isDragging = false;
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
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
      this.capturedImage = null;
      this.$refs.fileInput.value = "";
    },

    // Metode untuk kamera
    openCamera() {
      this.showCameraModal = true;
      this.$nextTick(() => {
        this.startCamera();
        this.checkMultipleCameras();
      });
    },

    async checkMultipleCameras() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        this.hasMulitpleCameras = false;
        return;
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        this.hasMulitpleCameras = videoDevices.length > 1;
      } catch (err) {
        console.error("Error checking cameras:", err);
        this.hasMulitpleCameras = false;
      }
    },

    async startCamera() {
      this.cameraLoading = true;
      this.cameraError = null;

      try {
        // Hentikan stream sebelumnya jika ada
        if (this.videoStream) {
          this.videoStream.getTracks().forEach((track) => {
            track.stop();
          });
        }

        const constraints = {
          video: {
            facingMode: this.currentFacingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };

        this.videoStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );

        if (this.$refs.videoElement) {
          this.$refs.videoElement.srcObject = this.videoStream;
        }
      } catch (err) {
        console.error("Error akses kamera:", err);
        this.cameraError = this.getCameraErrorMessage(err);
      } finally {
        this.cameraLoading = false;
      }
    },

    getCameraErrorMessage(error) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        return "Akses kamera ditolak. Silakan izinkan akses ke kamera dan coba lagi.";
      } else if (
        error.name === "NotFoundError" ||
        error.name === "DevicesNotFoundError"
      ) {
        return "Tidak dapat menemukan kamera. Pastikan perangkat Anda memiliki kamera.";
      } else if (
        error.name === "NotReadableError" ||
        error.name === "TrackStartError"
      ) {
        return "Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi tersebut dan coba lagi.";
      } else if (
        error.name === "OverconstrainedError" ||
        error.name === "ConstraintNotSatisfiedError"
      ) {
        return "Kamera tidak mendukung resolusi yang diminta. Coba dengan pengaturan berbeda.";
      } else {
        return "Terjadi kesalahan saat mengakses kamera: " + error.message;
      }
    },

    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => {
          track.stop();
        });
        this.videoStream = null;
      }
    },

    captureImage() {
      if (!this.$refs.videoElement || !this.$refs.canvasElement) return;

      // Tampilkan efek flash
      this.showFlash = true;
      setTimeout(() => {
        this.showFlash = false;
      }, 300);

      const video = this.$refs.videoElement;
      const canvas = this.$refs.canvasElement;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL
      this.capturedImage = canvas.toDataURL("image/jpeg", 0.9); // 0.9 untuk kualitas yang baik tapi tidak terlalu berat

      // Replace video with captured image
      video.style.display = "none";
      canvas.style.display = "block";
      canvas.style.maxWidth = "100%";
      canvas.style.height = "auto";

      // Show captured image on canvas
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = this.capturedImage;
    },

    retakeImage() {
      if (!this.$refs.videoElement || !this.$refs.canvasElement) return;

      // Reset captured image
      this.capturedImage = null;

      // Show video again
      this.$refs.videoElement.style.display = "block";
      this.$refs.canvasElement.style.display = "none";
    },

    acceptImage() {
      if (!this.capturedImage) return;

      // Convert data URL to File object
      fetch(this.capturedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "camera-capture.jpg", {
            type: "image/jpeg",
          });
          this.selectedFile = file;
          this.imagePreview = this.capturedImage;
          this.closeCameraModal();
        });
    },

    closeCameraModal() {
      this.showCameraModal = false;
      this.stopCamera();
      this.capturedImage = null;
      this.cameraLoading = false;

      if (this.$refs.videoElement) {
        this.$refs.videoElement.style.display = "block";
      }

      if (this.$refs.canvasElement) {
        this.$refs.canvasElement.style.display = "none";
      }
    },

    switchCamera() {
      // Toggle facing mode
      this.currentFacingMode =
        this.currentFacingMode === "user" ? "environment" : "user";
      this.startCamera(); // Restart kamera dengan mode yang baru
    },

    toggleTimer() {
      // Rotate through timer options: 0 (off) -> 3 -> 5 -> 0
      if (this.countdownValue === 0) {
        this.countdownValue = 3;
      } else if (this.countdownValue === 3) {
        this.countdownValue = 5;
      } else {
        this.countdownValue = 0;
      }
    },

    startCountdown() {
      if (this.countdownValue <= 0) {
        this.captureImage();
        return;
      }

      this.countdownActive = true;
      let count = this.countdownValue;

      const countInterval = setInterval(() => {
        count--;
        this.countdownValue = count;

        if (count <= 0) {
          clearInterval(countInterval);
          this.countdownActive = false;
          this.countdownValue =
            this.countdownValue === 0 ? 0 : this.countdownValue === 1 ? 3 : 5; // Reset to original value
          this.captureImage();
        }
      }, 1000);
    },

    retryCamera() {
      this.cameraError = null;
      this.startCamera();
    },
  },
};
</script>

<style scoped>
.image-uploader {
  width: 100%;
  transition: all 0.3s ease;
}

.card {
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(244, 122, 158, 0.1);
  overflow: hidden;
  background-color: white;
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid rgba(244, 122, 158, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(244, 122, 158, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #ffffff, #ffffff);
  padding: 25px 20px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.card-header h4 {
  margin: 0;
  font-weight: 700;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
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
  border: 2px dashed rgba(244, 122, 158, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  background: linear-gradient(
    135deg,
    rgba(244, 122, 158, 0.05),
    rgba(246, 189, 217, 0.05)
  );
}

.upload-area:hover {
  border-color: #f47a9e;
  background: linear-gradient(
    135deg,
    rgba(244, 122, 158, 0.08),
    rgba(246, 189, 217, 0.08)
  );
  transform: scale(1.02);
}

.upload-area.active {
  border-color: #f47a9e;
  background: linear-gradient(
    135deg,
    rgba(244, 122, 158, 0.1),
    rgba(246, 189, 217, 0.1)
  );
}

.upload-area.has-image {
  border: none;
  background: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
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
  color: #f47a9e;
  margin-bottom: 15px;
}

.upload-icon svg {
  filter: drop-shadow(0 4px 6px rgba(244, 122, 158, 0.3));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
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
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba(244, 122, 158, 0.3);
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(244, 122, 158, 0.4);
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Gaya untuk modal kamera */
.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.camera-modal-content {
  width: 90%;
  max-width: 600px;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.4s ease;
  display: flex;
  flex-direction: column;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.camera-header {
  padding: 20px;
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.camera-header:before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(30deg);
  animation: headerShine 8s infinite linear;
}

.camera-header h3 {
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.camera-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.camera-body video,
.camera-body canvas {
  width: 100%;
  max-height: 60vh;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.camera-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
}

.camera-loader {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(244, 122, 158, 0.3);
  border-radius: 50%;
  border-top-color: #f47a9e;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.camera-status p {
  color: var(--text-light);
  font-size: 16px;
}

.camera-guide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.guide-oval {
  width: 70%;
  height: 80%;
  border: 2px dashed rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

.guide-text {
  position: absolute;
  bottom: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.02);
    opacity: 1;
  }
}

/* Tombol kamera */
.upload-options {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
}

.camera-btn {
  background: linear-gradient(135deg, #f47a9e, #f6bdd9);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 15px rgba(244, 122, 158, 0.3);
}

.camera-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(244, 122, 158, 0.4);
}

/* Media queries untuk responsivitas */
@media (max-width: 768px) {
  .camera-modal-content {
    width: 95%;
    max-width: 500px;
  }

  .camera-controls {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .camera-header h3 {
    font-size: 18px;
  }

  .camera-body video,
  .camera-body canvas {
    max-height: 50vh;
  }

  .capture-btn {
    width: 50px;
    height: 50px;
  }

  .accept-btn,
  .retake-btn {
    padding: 10px 16px;
    font-size: 13px;
  }
}

/* Gaya untuk countdown timer */
.countdown-timer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.countdown-text {
  font-size: 48px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

.countdown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
}

.countdown-value {
  font-size: 120px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  animation: countdownPulse 1s infinite;
}

@keyframes countdownPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.camera-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
}

.camera-error i {
  font-size: 40px;
  color: #e74c3c;
  margin-bottom: 15px;
}

.camera-error p {
  color: var(--text-light);
  font-size: 16px;
  margin-bottom: 20px;
}

.retry-btn {
  background: #f47a9e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.retry-btn:hover {
  background: #f6bdd9;
  transform: translateY(-3px);
}

.capture-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.capture-mode {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.timer-toggle {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(4px);
}

.timer-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Media queries untuk responsivitas di perangkat mobile */
@media (max-width: 480px) {
  .countdown-value {
    font-size: 90px;
  }

  .guide-oval {
    width: 80%;
    height: 70%;
  }

  .camera-controls {
    padding: 15px 0 5px;
  }

  .camera-modal-content {
    width: 100%;
    height: 100%;
    max-width: none;
    border-radius: 0;
  }

  .camera-body {
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .camera-body video,
  .camera-body canvas {
    flex: 1;
    object-fit: cover;
    height: auto;
  }

  .capture-btn {
    width: 50px;
    height: 50px;
  }
}
</style>
