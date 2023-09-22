// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

/* import {initializeApp  as initializeAdminApp} from "firebase-admin/app"
import {getAuth  as getAdminAuth, createCustomToken} from "firebase-admin/auth"

const adminApp = initializeAdminApp()
const adminAuth = getAdminAuth() */

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
const auth = getAuth(app);

export { auth };
export {}



/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {initializeApp  as initializeAdminApp} from "firebase-admin/app"
import {getAuth  as getAdminAuth, UserRecord  } from "firebase-admin/auth"


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


const adminConfig = {
  credential: initializeAdminApp.credential.cert(serviceAccount),
  databaseURL: "https://zuri-gallery-default-rtdb.firebaseio.com"
};
const app = initializeAdminApp(firebaseConfig);
const analytics = getAnalytics(app);

const adminApp = initializeAdminApp(adminConfig);

import { onCall, HttpsError } from "firebase-functions/v2/https";

exports.createUserAndSignInWithToken = onCall({ cors: true }, async (request) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      adminAuth,
      'test@abc.com',
      'password'
    );

    const customToken = await adminAuth.createCustomToken(userCredential.user.uid);
    return customToken;
  } catch (error) {
    // Handle errors here
    console.error(error);
    throw new HttpsError('internal', 'An error occurred.');
  }
});

const firebaseAuth = getAuth(app);


const user = adminAuth().getUser('bob');

const token = await adminAuth().createCustomToken('alice');
const auth = getAuth(app);

export { auth };
export {}
 */

