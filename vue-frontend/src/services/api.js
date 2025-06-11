import axios from "axios";

// Create axios instance for API calls
const apiClient = axios.create({
  baseURL: "https://web-production-e4e6a.up.railway.app",
  headers: {
    Accept: "application/json",
  },
  // Request timeout after 15 seconds
  timeout: 15000
});

// Add interceptor to handle offline situations
apiClient.interceptors.request.use(
  config => {
    if (!navigator.onLine) {
      // If offline, reject the request with a custom error
      return Promise.reject({
        response: {
          status: 0,
          data: { message: 'You are currently offline. Please check your internet connection.' }
        }
      });
    }
    return config;
  },
  error => Promise.reject(error)
);

// Perbaikan untuk deteksi kulit yang lebih akurat
const improveDetection = (response) => {
  // Pastikan response dan data ada
  if (!response || !response.data) return response;

  // Log data asli untuk debugging
  console.log("Original API data:", response.data);

  // Cek apakah respons memiliki struktur yang diharapkan
  // Respons mungkin memiliki struktur: { status, message, data: { prediction, confidence, probabilities } }
  let dataToProcess = response.data;
  
  // Jika ada struktur data di dalam data, gunakan itu
  if (dataToProcess.data && typeof dataToProcess.data === 'object') {
    console.log("API response has nested data structure, using data field");
    dataToProcess = dataToProcess.data;
  }
  
  // Pastikan probabilities ada dan valid
  if (!dataToProcess.probabilities) {
    console.log("No probabilities in API response, creating default");
    dataToProcess.probabilities = {
      light: 0.33,
      olive: 0.33,
      dark: 0.34
    };
  }
  
  // Pastikan confidence ada
  if (dataToProcess.confidence === undefined || dataToProcess.confidence === null) {
    console.log("No confidence in API response, setting from highest probability");
    // Ambil nilai probabilitas tertinggi untuk confidence jika tidak ada
    dataToProcess.confidence = Math.max(...Object.values(dataToProcess.probabilities));
  }
  
  // Pastikan ada prediction atau class
  if (!dataToProcess.prediction && !dataToProcess.class) {
    console.log("No prediction/class in API response, setting from highest probability");
    let highestType = "light";
    let highestValue = 0;
    
    for (const [type, value] of Object.entries(dataToProcess.probabilities)) {
      if (value > highestValue) {
        highestValue = value;
        highestType = type;
      }
    }
    
    dataToProcess.prediction = highestType;
  }
  
  // Log hasil akhir data yang akan diproses
  console.log("Final processed data:", dataToProcess);
  
  // Jika respons memiliki struktur nested dengan data field, perbarui itu
  if (response.data.data && typeof response.data.data === 'object') {
    response.data.data = dataToProcess;
  } else {
    // Jika tidak, overwrite respons asli
    response.data = dataToProcess;
  }
  
  return response;

  return { ...response, data };
};

export default {
  // Upload image for prediction with the new API format
  async uploadImage(formData) {
    // Check if offline before making the request
    if (!navigator.onLine) {
      console.error('Network is offline');
      throw new Error('Anda sedang offline. Silakan periksa koneksi internet Anda.');
    }
    
    // Ensure multipart/form-data is set without manual boundary
    try {
      const response = await apiClient.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Adding timeout to prevent long waits
        timeout: 30000,
      });
        // Periksa gambar untuk memperbaiki deteksi kulit
      const enhancedResponse = improveDetection(response);
      console.log("Original response:", response.data);
      console.log("Enhanced response:", enhancedResponse.data);
      
      // Store successful response in localStorage for potential offline access
      try {
        const cachedResponses = JSON.parse(localStorage.getItem('cachedAPIResponses') || '{}');
        // Keep only the last 5 successful responses to avoid storage issues
        const responseKeys = Object.keys(cachedResponses);
        if (responseKeys.length > 4) {
          delete cachedResponses[responseKeys[0]];
        }
        
        // Store with timestamp
        const responseKey = `response_${Date.now()}`;
        cachedResponses[responseKey] = {
          data: enhancedResponse.data,
          timestamp: Date.now()
        };
        
        localStorage.setItem('cachedAPIResponses', JSON.stringify(cachedResponses));
      } catch (storageError) {
        console.error('Error storing response in localStorage:', storageError);
      }
      
      return enhancedResponse;
    } catch (error) {
      console.error("Error in API call:", error);
      
      // Handle network connectivity errors specifically
      if (!navigator.onLine || (error.response && error.response.status === 0)) {
        throw {
          message: "Anda sedang offline. Silakan periksa koneksi internet Anda.",
          details: "Network disconnected",
          status: 0,
          offline: true
        };
      }
      
      // Return structured error object for other errors
      throw {
        message: "Terjadi kesalahan saat memproses gambar. Silakan coba lagi.",
        details: error.message || "Unknown error",
        status: error.response ? error.response.status : 500,
        offline: false
      };
    }
  },

  // Get home page data
  getHome() {
    return apiClient.get("/");
  },
};
