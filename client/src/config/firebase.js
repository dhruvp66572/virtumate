// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpwZ4gcrR1N3gDWCKJhPaARUuV43ndJfY",
  authDomain: "virtumate-88767.firebaseapp.com",
  databaseURL: "https://virtumate-88767-default-rtdb.firebaseio.com",
  projectId: "virtumate-88767",
  storageBucket: "virtumate-88767.firebasestorage.app",
  messagingSenderId: "255806030517",
  appId: "1:255806030517:web:32dafed8b6f849165874fc",
  measurementId: "G-S15NYRB4T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth,app };