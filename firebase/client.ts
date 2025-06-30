import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA7Z0p6qmyX74KZo15y_0LrPTEhKlBhsnY",
  authDomain: "you-re-hired.firebaseapp.com",
  projectId: "you-re-hired",
  storageBucket: "you-re-hired.firebasestorage.app",
  messagingSenderId: "410009225028",
  appId: "1:410009225028:web:663d94bf1e5c44e5d43911",
  measurementId: "G-LS3YX159KF"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);