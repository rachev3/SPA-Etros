import { useState, useCallback } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
} from "../services/userService";

/**
 * Custom hook for authentication
 * Provides functions and state for user authentication
 */
export const useAuth = () => {
  const [user, setUser] = useState(getCurrentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);
      setUser(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      setUser(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const checkAuth = useCallback(() => {
    return isAuthenticated();
  }, []);

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated: checkAuth(),
  };
};
