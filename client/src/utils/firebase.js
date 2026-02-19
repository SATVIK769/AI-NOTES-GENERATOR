// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-2c0aa.firebaseapp.com",
  projectId: "authexamnotes-2c0aa",
  storageBucket: "authexamnotes-2c0aa.firebasestorage.app",
  messagingSenderId: "1081819669037",
  appId: "1:1081819669037:web:9b04cdcf911563c8fc4ea4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}