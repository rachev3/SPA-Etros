import axios from "axios";

// Base URL for all API requests
const API_BASE_URL = "https://etrosapi.onrender.com/api";

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common error patterns
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    const { response } = error;

    if (response && response.status === 401) {
      // Handle unauthorized access - clear auth data if token is invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // You might want to redirect to login page
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with an error status
    return {
      status: error.response.status,
      message: error.response.data.message || "An error occurred on the server",
      data: error.response.data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: 0,
      message: "No response from server. Please check your connection",
      data: null,
    };
  } else {
    // Something happened in setting up the request
    return {
      status: 0,
      message: error.message || "Error processing request",
      data: null,
    };
  }
};

// Export the axios instance for use in service modules
export default apiClient;
