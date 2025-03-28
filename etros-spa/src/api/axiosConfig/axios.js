import axios from "axios";
import { API_BASE_URL } from "./config";

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
    // Debug request

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common error patterns
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    // Debug error response
    console.error("API Error Response:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

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

export default apiClient;
