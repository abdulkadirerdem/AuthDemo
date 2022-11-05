// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa9kvOkouwqEx1BSEZydi-6SZfxPWR1f8",
  authDomain: "authdemo-46e44.firebaseapp.com",
  projectId: "authdemo-46e44",
  storageBucket: "authdemo-46e44.appspot.com",
  messagingSenderId: "394529227521",
  appId: "1:394529227521:web:5227ddaec0c5f3831e1100",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
