// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdaZ0AOMjCa9yvKXrJDMOiB9skV4LkUbI",
  authDomain: "world-peace-78895.firebaseapp.com",
  databaseURL: "https://world-peace-78895-default-rtdb.firebaseio.com",
  projectId: "world-peace-78895",
  storageBucket: "world-peace-78895.appspot.com",
  messagingSenderId: "927733969248",
  appId: "1:927733969248:web:abb01d378aac9f1a726e05",
  measurementId: "G-5BWECEDTX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default getFirestore()