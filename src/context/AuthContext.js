'use client';

import { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext to manage user authentication state
 */
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login 
   * @param {string} username 
   * @param {string} password 
   * @returns {boolean} 
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
 * @returns {Object}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
