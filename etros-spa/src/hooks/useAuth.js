<<<<<<< HEAD
import { useCallback } from "react";
import { registerUser, loginUser } from "../api/auth";
import { useUser } from "../context/UserContext";
=======
import { useState, useCallback } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
} from "../services/userService";
>>>>>>> origin/main

/**
 * Custom hook for authentication
 * Provides functions and state for user authentication
 */
export const useAuth = () => {
<<<<<<< HEAD
  const { login, logout, user, loading, isAuthenticated } = useUser();

  const register = useCallback(async (userData) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
=======
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
>>>>>>> origin/main
      throw err;
    }
  }, []);

<<<<<<< HEAD
  const handleLogin = useCallback(
    async (credentials) => {
      try {
        const data = await loginUser(credentials);
        login(data);
        return data;
      } catch (err) {
        throw err;
      }
    },
    [login]
  );
=======
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
>>>>>>> origin/main

  return {
    user,
    loading,
<<<<<<< HEAD
    register,
    login: handleLogin,
    logout,
    isAuthenticated,
=======
    error,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated: checkAuth(),
>>>>>>> origin/main
  };
};
