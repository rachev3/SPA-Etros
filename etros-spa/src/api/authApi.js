import apiClient from "./axiosConfig/axios";
import { handleApiError } from "./errorHandler";
import { API_ENDPOINTS } from "./axiosConfig/config";

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.auth.register,
      userData
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.auth.login,
      credentials
    );

    // Store the token and user data in localStorage for persistence
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.auth.user);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
