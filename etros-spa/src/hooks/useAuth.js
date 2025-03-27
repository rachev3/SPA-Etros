import { useCallback } from "react";
import { registerUser, loginUser } from "../api/auth";
import { useUser } from "../context/UserContext";

/**
 * Custom hook for authentication
 * Provides functions and state for user authentication
 */
export const useAuth = () => {
  const { login, logout, user, loading, isAuthenticated } = useUser();

  const register = useCallback(async (userData) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

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

  return {
    user,
    loading,
    register,
    login: handleLogin,
    logout,
    isAuthenticated,
  };
};
