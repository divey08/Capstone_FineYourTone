import axios from 'axios';

// Create axios instance for API calls
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  }
});

export default {
  // Upload image for prediction
  uploadImage(formData) {
    return apiClient.post('/predict', formData);
  },
  
  // Get home page data
  getHome() {
    return apiClient.get('/');
  }
};
