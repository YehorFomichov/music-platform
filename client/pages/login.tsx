import React from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../utils/firebase.utils";
import styles from "../styles/login.module.scss";
const Login = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("user", user);
    console.log("userDocRef", userDocRef);
  };
  return (
    <div className={styles.login_container}>
      <div
        className="container-fluid position-absolute"
        style={{ backgroundColor: "white" }}
      >
        <div className={styles.google_button} onClick={logGoogleUser}>
          <span>Sign in with Google Account</span>
        </div>
        <div className={styles.facebook_button}>
          <span>Sign in with Facebook Account</span>
        </div>
        <hr className={styles.line} />
        <form>
          <div className={styles.form_container}>
            <label htmlFor="email" className={styles.form_label}>
              Email address
            </label>
            <input
              type="email"
              autoComplete={"off"}
              className={styles.form_input}
              placeholder="Please enter your email address"
              id="login-username"
              aria-describedby="emailHelp"
            />
          </div>
          <div className={styles.form_container}>
            <label
              htmlFor="exampleInputPassword1"
              className={styles.form_label}
            >
              Password
            </label>
            <input
              type="password"
              className={styles.form_input}
              id="login-password"
            />
          </div>
          <div className={styles.form_check}>
            <input type="checkbox" id="exampleCheck1" checked={true} />
            <label className={styles.form_check_label} htmlFor="stayOn">
              Remember me?
            </label>
          </div>
          <div className={styles.login_button}>
            <span>Login</span>
          </div>
          <span>
            {`Don't have account? `}
            <a href="/sign-up">SignUP</a>
          </span>
        </form>
      </div>
    </div>
  );
  return (
    <div className="text-white">
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
    </div>
  );
};

export default Login;
