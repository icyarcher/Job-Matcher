// frontend/src/services/authService.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';

// Funcție pentru autentificare
const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Funcție pentru înregistrare
const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Funcție pentru deconectare
const logout = () => {
  return signOut(auth);
};

// Funcție pentru a observa schimbările stării de autentificare
const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
}


export {
  login,
  register,
  logout,
  observeAuthState
};