// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ibs-broker.firebaseapp.com",
  projectId: "ibs-broker",
  storageBucket: "ibs-broker.appspot.com",
  messagingSenderId: "271377786674",
  appId: "1:271377786674:web:8243195f670fe63b17d92b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);