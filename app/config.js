// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQPNOvVCf-jefScael6UW2n28ersPYq9c",
  authDomain: "codico-global-academy-fda6d.firebaseapp.com",
  projectId: "codico-global-academy-fda6d",
  storageBucket: "codico-global-academy-fda6d.firebasestorage.app",
  messagingSenderId: "472990375816",
  appId: "1:472990375816:web:9634af4e3691ca3f43243d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export { db };
