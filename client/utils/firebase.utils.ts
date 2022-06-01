import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCwvzoKPTnOuqgfSn3M5Kmw1BW6XzPEk5s",
  authDomain: "music-platform-a3016.firebaseapp.com",
  projectId: "music-platform-a3016",
  storageBucket: "music-platform-a3016.appspot.com",
  messagingSenderId: "411588718666",
  appId: "1:411588718666:web:3e0c6389516e70202a76b3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  return userDocRef;
};
