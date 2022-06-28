import React, { useState } from "react";
import styles from "../styles/login.module.scss";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const resetForm = () => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  const handleChange = (e) => {
    setData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  async function submitForm() {
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await createUserDocumentFromAuth(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });
      resetForm();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log(e);
    }
  }

  return (
    <div className={styles.login_container}>
      <div
        className="container-fluid position-absolute"
        style={{ backgroundColor: "white", maxWidth: "720px" }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className={styles.form_container}>
            <label htmlFor="firstName" className={styles.form_label}>
              First name
            </label>
            <input
              type="text"
              className={styles.form_input}
              placeholder="Please enter your First name"
              id="firstName"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_container}>
            <label htmlFor="lastName" className={styles.form_label}>
              Last name
            </label>
            <input
              type="text"
              className={styles.form_input}
              placeholder="Please enter your last name"
              id="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_container}>
            <label htmlFor="email" className={styles.form_label}>
              Email address
            </label>
            <input
              type="email"
              className={styles.form_input}
              placeholder="Please enter your email address"
              id="email"
              value={data.email}
              onChange={handleChange}
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
              id="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_check}>
            <input type="checkbox" id="exampleCheck1" />
            <label className={styles.form_check_label} htmlFor="stayOn">
              Do you accept the terms and conditions?
            </label>
          </div>
          <div className={styles.login_button} onClick={submitForm}>
            <span>Sign-UP</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
