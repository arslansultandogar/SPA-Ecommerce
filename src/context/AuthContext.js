'use client';

import { createContext, useContext, useState } from 'react';

/**
 * AuthContext - Manages authentication state across the application
 * Provides user authentication state and login/logout methods
 */
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  if (typeof window !== 'undefined' && loading) {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }

  /**
   * Login function with hardcoded credentials
   * @param {string} username - Admin username
   * @param {string} password - Admin password (123456)
   * @returns {boolean} - True if login successful
   */
  const login = (username, password) => {
    const ADMIN_USERNAME = 'Admin';
    const ADMIN_PASSWORD = '123456';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const userData = { username, isAuthenticated: true };
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  /**
   * Logout function - clears user session
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use authentication context
 * @returns {Object} - Auth context value with user, login, logout, loading
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
