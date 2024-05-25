import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDBhyh3jecwgiGwTfEZfjeu5wSzsSPkgSk",
  authDomain: "mazdoor-65199.firebaseapp.com",
  projectId: "mazdoor-65199",
  storageBucket: "mazdoor-65199.appspot.com",
  messagingSenderId: "722618618561",
  appId: "1:722618618561:web:d5ee929d590ef001bc3a40",
  measurementId: "G-X7JP4313RG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);