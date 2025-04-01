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
    const loadUser = () => {
      if (checkIsAuthenticated()) {
        const userData = getCurrentUser();
        setUser(userData);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (responseData) => {
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
