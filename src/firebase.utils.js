import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth';


const config = {
  apiKey: "AIzaSyAKJHyi-9acTIUtvcqiXoyWSyj5DVXa3wk",
  authDomain: "zuri-gallery.firebaseapp.com",
  databaseURL: "https://zuri-gallery-default-rtdb.firebaseio.com",
  projectId: "zuri-gallery",
  storageBucket: "zuri-gallery.appspot.com",
  messagingSenderId: "319350153082",
  appId: "1:319350153082:web:940214e85f19e74e54c0c3",
  measurementId: "G-S6V5292W9H"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
          await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
          });
      } catch (error){
          console.log('error creating user', error.message);
      }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;