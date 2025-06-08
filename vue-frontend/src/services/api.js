import axios from "axios";

// Create axios instance for API calls
const apiClient = axios.create({
  baseURL: "https://web-production-e4e6a.up.railway.app",
  headers: {
    Accept: "application/json",
  },
});

export default {
  // Upload image for prediction with the new API format
  uploadImage(formData) {
    // Ensure multipart/form-data is set without manual boundary
    return apiClient.post("/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // Adding timeout to prevent long waits
      timeout: 30000,
    });
  },

  // Get home page data
  getHome() {
    return apiClient.get("/");
  },
};
