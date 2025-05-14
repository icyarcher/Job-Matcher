import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5LxDJuY1s_yhcVGVDP_LmYDSmsu7zqpg",
  authDomain: "job-matcher-a7b5e.firebaseapp.com",
  projectId: "job-matcher-a7b5e",
  storageBucket: "job-matcher-a7b5e.firebasestorage.app",
  messagingSenderId: "168475309724",
  appId: "1:168475309724:web:9dbf64d6a06229c76bdf59",
  measurementId: "G-FNLD8TYEXN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;