import { useCallback } from "react";
import { registerUser, loginUser } from "../api/authApi";
import useUser from "./useUser";
import { use } from "react";

export const useAuth = () => {
  const { login, logout, user, loading, isAuthenticated } = useUser();

  const register = useCallback(async (userData) => {
    const promise = registerUser(userData);
    return use(promise);
  }, []);

  const handleLogin = useCallback(
    async (credentials) => {
      try {
        const data = await loginUser(credentials);
        login(data);
        return data;
      } catch (error) {
        throw error;
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
