// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {initializeApp  as initializeAdminApp} from "firebase-admin/app"
import {getAuth  as getAdminAuth, createCustomToken} from "firebase-admin/auth"

const adminApp = initializeAdminApp()
const adminAuth = getAdminAuth()

const firebaseConfig = {
  apiKey: "AIzaSyAKJHyi-9acTIUtvcqiXoyWSyj5DVXa3wk",
  authDomain: "zuri-gallery.firebaseapp.com",
  databaseURL: "https://zuri-gallery-default-rtdb.firebaseio.com",
  projectId: "zuri-gallery",
  storageBucket: "zuri-gallery.appspot.com",
  messagingSenderId: "319350153082",
  appId: "1:319350153082:web:940214e85f19e74e54c0c3",
  measurementId: "G-S6V5292W9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Get the authentication (auth) object
const auth = getAuth(firebaseApp);

export { auth };
export {}

