import React, { useState } from "react";
import Navbar from "../ui/navbar";
import styles from "./main-page.module.css";

const MainPage = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const handleToggleNavbar = () => {
    setTimeout(() => {
      document.body.scrollIntoView({ behavior: "smooth" });
    }, 10);
    setShowNavBar((prevState) => !prevState);
  };
  return (
    <>
      {!showNavBar && (
        <div className={styles.container}>
          <h1>Welcome</h1>
          <h3>Here we have all the best tracks</h3>
        </div>
      )}
      <Navbar showNavBar={showNavBar} onToggleNavbar={handleToggleNavbar} />
    </>
  );
};

export default MainPage;
