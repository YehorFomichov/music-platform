import React, { useEffect, useRef } from "react";
import styles from "./navbar.module.css";
interface NavbarType {
  showNavBar: boolean;
  onToggleNavbar: () => void;
}
const Navbar: React.FC<NavbarType> = ({ showNavBar, onToggleNavbar }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    return () => {
      console.log((inputRef.current.checked = false));
    };
  }, []);
  return (
    <div className={styles.container}>
      <input type="checkbox" id={styles.burgerToggle} ref={inputRef} />
      <label
        htmlFor={styles.burgerToggle}
        className={styles.burgerMenu}
        onClick={onToggleNavbar}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </label>
      {showNavBar && (
        <div className={styles.menu}>
          <div className={styles.menuInner}>
            <ul className={styles.menuNav}>
              <li className={styles.menuNavItem}>
                <a className={styles.menuNavLink} href="#">
                  <span>
                    <div>Home</div>
                  </span>
                </a>
              </li>
              <li className={styles.menuNavItem}>
                <a className={styles.menuNavLink} href="#">
                  <span>
                    <div>About</div>
                  </span>
                </a>
              </li>
              <li className={styles.menuNavItem}>
                <a className={styles.menuNavLink} href="#">
                  <span>
                    <div>Service</div>
                  </span>
                </a>
              </li>
              <li className={styles.menuNavItem}>
                <a className={styles.menuNavLink} href="#">
                  <span>
                    <div>Team</div>
                  </span>
                </a>
              </li>
            </ul>
            <div className={styles.gallery}>
              <div className={styles.title}>
                <p>Categories</p>
              </div>
              <div className={styles.images}>
                <a className={styles.imageLink} href="/tracks">
                  <div className={styles.image} data-label="Tracks">
                    <img
                      src="https://unsplash.com/photos/RQ0_Fp2Hr2M/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8bXVzaWN8ZW58MHwxfHx8MTY1MjcwNzg1MQ&force=true&w=640"
                      alt=""
                    />
                  </div>
                </a>
                <a className={styles.imageLink} href="/albums">
                  <div className={styles.image} data-label="Albums">
                    <img
                      src="https://unsplash.com/photos/3hWg9QKl5k8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8bXVzaWN8ZW58MHwxfHx8MTY1MjcwNzg1MQ&force=true&w=640"
                      alt=""
                    />
                  </div>
                </a>
                <a className={styles.imageLink} href="/genres">
                  <div className={styles.image} data-label="Genres">
                    <img
                      src="https://unsplash.com/photos/laHwVPkMTzY/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8bXVzaWMlMjBnZW5yZXN8ZW58MHwxfHx8MTY1MjcxNzE1OQ&force=true&w=640"
                      alt=""
                    />
                  </div>
                </a>
                <a className={styles.imageLink} href="/favorites">
                  <div className={styles.image} data-label="Favorites">
                    <img
                      src="https://unsplash.com/photos/QVnw_3l_n0Y/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fG11c2ljJTIwZ2VucmVzfGVufDB8MXx8fDE2NTI3MTcxNTk&force=true&w=640"
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
