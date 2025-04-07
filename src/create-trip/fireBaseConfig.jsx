// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNJLJHD6idzNuqBpQeWyLRsu9EpMiZ3fY",
  authDomain: "netflix-clone-9edfd.firebaseapp.com",
  projectId: "netflix-clone-9edfd",
  storageBucket: "netflix-clone-9edfd.firebasestorage.app",
  messagingSenderId: "755800600089",
  appId: "1:755800600089:web:c7a2146fee30c1980dc488"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);