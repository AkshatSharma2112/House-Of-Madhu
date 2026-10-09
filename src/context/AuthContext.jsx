import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if admin is already authenticated
  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem('adminAuth');
      if (auth === 'true') {
        setIsAdmin(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Admin login
  const adminLogin = (password) => {
    // Change this to your desired password
    const ADMIN_PASSWORD = 'admin123'; // ⚠️ Change this!
    
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  // Admin logout
  const adminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('adminAuth');
  };

  const value = {
    isAdmin,
    loading,
    adminLogin,
    adminLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};