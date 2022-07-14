import React, { useState } from "react";
import styles from "../styles/login.module.scss";
import InputForm from "../components/common/input-form";
import { useRouter } from "next/router";
import { useUserActions } from "../hooks/useUserActions";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { loginWithGoogle, loginWithEmail } = useUserActions();
  const handleChange = (target) => {
    setData((prevstate) => {
      return { ...prevstate, [target.name]: target.value };
    });
  };
  const handleLoginWithGoogle = async () => {
    try {
      const res = await loginWithGoogle();
      if (res) await router.push("/");
    } catch (e) {
      console.log("Something went wrong");
    }
  };
  const logInWithEmail = async () => {
    try {
      const res = await loginWithEmail(data.email, data.password);
      if (res) await router.push("/");
    } catch (e) {
      console.log("Something went wrong");
    }
  };
  return (
    <div className={styles.login_container}>
      <div className="container">
        <div className={styles.google_button} onClick={handleLoginWithGoogle}>
          <span>Sign in with Google Account</span>
        </div>
        <div className={styles.facebook_button}>
          <span>Sign in with Facebook Account</span>
        </div>
        <hr className={styles.line} />
        <form>
          <div className={styles.form_container}>
            <InputForm
              label={"Email"}
              type={"email"}
              name={"email"}
              value={data.email}
              onChange={handleChange}
              white={true}
            />
          </div>
          <div className={styles.form_container}>
            <InputForm
              label={"Password"}
              type={"password"}
              name={"password"}
              value={data.password}
              onChange={handleChange}
              white={true}
            />
          </div>
          <div className={styles.form_check}>
            <input type="checkbox" id="exampleCheck1" />
            <label className={styles.form_check_label} htmlFor="stayOn">
              Remember me?
            </label>
          </div>
          <div className={styles.login_button} onClick={logInWithEmail}>
            <span>Login</span>
          </div>
        </form>

        <span>
          {`Don't have account? `}
          <Link href="/sign-up">SignUP</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
