import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "@firebase/firestore";
import firebase from "firebase/compat";
import UserCredential = firebase.auth;
const firebaseConfig = {
  apiKey: "AIzaSyCwvzoKPTnOuqgfSn3M5Kmw1BW6XzPEk5s",
  authDomain: "music-platform-a3016.firebaseapp.com",
  projectId: "music-platform-a3016",
  storageBucket: "music-platform-a3016.appspot.com",
  messagingSenderId: "411588718666",
  appId: "1:411588718666:web:3e0c6389516e70202a76b3",
};
export const getKey = () => {
  return firebaseConfig.apiKey;
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
const facebookProvider = new FacebookAuthProvider();

export const auth = getAuth();
export const signInWithGooglePopup = (): Promise<any> =>
  signInWithPopup(auth, googleProvider);
export const signInWithFacebookPopup = () => {
  signInWithPopup(auth, facebookProvider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (
  email,
  password
): Promise<any> => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
