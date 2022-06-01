import React from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../utils/firebase.utils";
const Login = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  return (
    <div className="text-white">
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
    </div>
  );
};

export default Login;
