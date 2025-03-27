import { registerUser, loginUser, getUserProfile } from "../api/authApi";

export { registerUser, loginUser, getUserProfile };

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
