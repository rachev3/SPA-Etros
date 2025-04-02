import { useCallback } from "react";
import { registerUser, loginUser } from "../api/authApi";
import useUser from "./useUser";

export const useAuth = () => {
  const { login, logout, user, loading, isAuthenticated } = useUser();

  const register = useCallback(async (userData) => {
    const data = await registerUser(userData);
    return data;
  }, []);

  const handleLogin = useCallback(
    async (credentials) => {
      const data = await loginUser(credentials);

      login(data);

      return data;
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
