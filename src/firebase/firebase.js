// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd5ZexiS994GV3sRckzDcaa1PFeXuh0_8",
  authDomain: "gst-master.firebaseapp.com",
  projectId: "gst-master",
  storageBucket: "gst-master.firebasestorage.app",
  messagingSenderId: "699629113175",
  appId: "1:699629113175:web:932bbd1f893578fbd1b812",
  measurementId: "G-K7QL7QTC97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };