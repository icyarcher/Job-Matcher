import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
}

export {
  login,
  register,
  logout,
  observeAuthState
};