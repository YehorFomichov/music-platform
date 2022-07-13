import React from "react";
import styles from "./navbar.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const { user } = useTypedSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <img src={"/logo2.png"} onClick={() => router.push("/")} />
      </div>
      <div className={styles.profile}>
        {user ? (
          <>
            <p>Profile</p>
            <i className="bi bi-person"></i>
          </>
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
      {/*{showNavBar && (*/}
      {/*  <div className={styles.menu}>*/}
      {/*    <div className={styles.menuInner}>*/}
      {/*      <ul className={styles.menuNav}>*/}
      {/*        <li className={styles.menuNavItem}>*/}
      {/*          <Link href="/">*/}
      {/*            <a className={styles.menuNavLink} onClick={onToggleNavbar}>*/}
      {/*              <span>*/}
      {/*                <div>Home</div>*/}
      {/*              </span>*/}
      {/*            </a>*/}
      {/*          </Link>*/}
      {/*        </li>*/}
      {/*        <li className={styles.menuNavItem}>*/}
      {/*          {user ? (*/}
      {/*            <Link href="/profile">*/}
      {/*              <a className={styles.menuNavLink} onClick={onToggleNavbar}>*/}
      {/*                <span>*/}
      {/*                  <div>Profile</div>*/}
      {/*                </span>*/}
      {/*              </a>*/}
      {/*            </Link>*/}
      {/*          ) : (*/}
      {/*            <Link href="/login">*/}
      {/*              <a className={styles.menuNavLink} onClick={onToggleNavbar}>*/}
      {/*                <span>*/}
      {/*                  <div>Login</div>*/}
      {/*                </span>*/}
      {/*              </a>*/}
      {/*            </Link>*/}
      {/*          )}*/}
      {/*        </li>*/}
      {/*        <li className={styles.menuNavItem}>*/}
      {/*          <Link href="/upload">*/}
      {/*            <a className={styles.menuNavLink} onClick={onToggleNavbar}>*/}
      {/*              <span>*/}
      {/*                <div>Upload</div>*/}
      {/*              </span>*/}
      {/*            </a>*/}
      {/*          </Link>*/}
      {/*        </li>*/}
      {/*      </ul>*/}
      {/*      <div className={styles.gallery}>*/}
      {/*        <div className={styles.title}>*/}
      {/*          <p>Categories</p>*/}
      {/*        </div>*/}
      {/*        <div className={styles.images}>*/}
      {/*          <Link className={styles.imageLink} href="/tracks">*/}
      {/*            <div className={styles.image} data-label="Tracks">*/}
      {/*              <img*/}
      {/*                src="https://unsplash.com/photos/RQ0_Fp2Hr2M/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8bXVzaWN8ZW58MHwxfHx8MTY1MjcwNzg1MQ&force=true&w=640"*/}
      {/*                alt=""*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*          </Link>*/}
      {/*          <Link className={styles.imageLink} href="/albums">*/}
      {/*            <div className={styles.image} data-label="Albums">*/}
      {/*              <img*/}
      {/*                src="https://unsplash.com/photos/3hWg9QKl5k8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8bXVzaWN8ZW58MHwxfHx8MTY1MjcwNzg1MQ&force=true&w=640"*/}
      {/*                alt=""*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*          </Link>*/}
      {/*          <Link className={styles.imageLink} href="/genres">*/}
      {/*            <div className={styles.image} data-label="Genres">*/}
      {/*              <img*/}
      {/*                src="https://unsplash.com/photos/laHwVPkMTzY/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8bXVzaWMlMjBnZW5yZXN8ZW58MHwxfHx8MTY1MjcxNzE1OQ&force=true&w=640"*/}
      {/*                alt=""*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*          </Link>*/}
      {/*          <Link className={styles.imageLink} href="/favorites">*/}
      {/*            <div className={styles.image} data-label="Favorites">*/}
      {/*              <img*/}
      {/*                src="https://unsplash.com/photos/QVnw_3l_n0Y/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fG11c2ljJTIwZ2VucmVzfGVufDB8MXx8fDE2NTI3MTcxNTk&force=true&w=640"*/}
      {/*                alt=""*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*          </Link>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Navbar;
