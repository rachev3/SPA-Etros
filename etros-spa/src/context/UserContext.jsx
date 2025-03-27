import { createContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  isAuthenticated,
  logoutUser,
} from "../services/userService";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and load user data on mount
    const loadUser = () => {
      if (isAuthenticated()) {
        const userData = getCurrentUser();
        setUser(userData);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
