// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa2ql9MsOjk0_J89OfHgWKhK3VtPWsNUY",
  authDomain: "instagram-tailwind-418a4.firebaseapp.com",
  projectId: "instagram-tailwind-418a4",
  storageBucket: "instagram-tailwind-418a4.appspot.com",
  messagingSenderId: "689229576707",
  appId: "1:689229576707:web:7b0a3b7aeb856d28baec36",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
