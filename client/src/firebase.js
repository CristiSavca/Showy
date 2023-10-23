// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4MFb1SRkZHbT7u5r2SoxGdvsXxX-LyB8",
  authDomain: "showy-92cc7.firebaseapp.com",
  projectId: "showy-92cc7",
  storageBucket: "showy-92cc7.appspot.com",
  messagingSenderId: "1044921691060",
  appId: "1:1044921691060:web:cfe35f957578134e5ce0e1",
  measurementId: "G-6CE4YFVZS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export default app;