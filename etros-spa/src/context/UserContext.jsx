import { createContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  isAuthenticated as checkIsAuthenticated,
  logoutUser,
} from "../services/userService";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and load user data on mount
    const loadUser = () => {
      if (checkIsAuthenticated()) {
        // Get user data from localStorage
        const userData = getCurrentUser();
        setUser(userData);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (responseData) => {
    // responseData is from API which has { data: { user info } } structure
    if (responseData && responseData.data) {
      setUser(responseData.data);
    } else {
      setUser(responseData);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Provide the complete context value
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: checkIsAuthenticated(),
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
