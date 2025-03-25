import apiClient, { handleApiError } from "../utils/apiUtils";

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);

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
    const response = await apiClient.get("/auth/user");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
