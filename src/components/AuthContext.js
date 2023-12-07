// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
   
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { authenticated: storedAuthenticated, username: storedUsername } = JSON.parse(storedAuth);
      setAuthenticated(storedAuthenticated);
      setUsername(storedUsername);
    }
  }, []);

  const login = (newUsername) => {
    setAuthenticated(true);
    setUsername(newUsername);

    
    localStorage.setItem('auth', JSON.stringify({ authenticated: true, username: newUsername }));
  };

  const logout = () => {
    setAuthenticated(false);
    setUsername('');

   
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
