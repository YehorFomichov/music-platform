import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const { user } = useTypedSelector((state) => state.user);
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <img src={"/logo2.png"} onClick={() => router.push("/")} />
      </div>
      <div className={styles.profile}>
        {showChild && user ? (
          <Link href="/profile">
            <span>
              <p>Profile</p>
              <i className="bi bi-person"></i>
            </span>
          </Link>
        ) : (
          <Link href="/login">
            <div className={styles.upload_button}>
              <i className="bi bi-upload"></i>
              <div>Login</div>
            </div>
          </Link>
        )}
        <Link href="/upload">
          <div className={styles.upload_button}>
            <i className="bi bi-upload"></i>
            <div>Upload</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Navbar;
