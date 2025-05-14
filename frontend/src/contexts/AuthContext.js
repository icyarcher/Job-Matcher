// frontend/src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { observeAuthState, login, register, logout } from '../services/authService'; // Importă funcțiile din service

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observă starea de autentificare la montarea componentei
  useEffect(() => {
    const unsubscribe = observeAuthState(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Curăță listener-ul la demontarea componentei
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  // Nu randa copii până când starea autentificării nu este verificată prima dată
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}