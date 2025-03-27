import { useCallback } from "react";
import { registerUser, loginUser } from "../api/authApi";
import useUser from "./useUser";

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
