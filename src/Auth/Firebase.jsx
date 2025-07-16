import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBNrUwennGLrud6_d4wVFRnwFMGQ0zQ0pA",
  authDomain: "event-management-271cf.firebaseapp.com",
  projectId: "event-management-271cf",
  storageBucket: "event-management-271cf.firebasestorage.app",
  messagingSenderId: "827595648734",
  appId: "1:827595648734:web:5e807a766583880cf2dc4f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export default app;