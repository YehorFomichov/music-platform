import React from "react";
import styles from "./main-page.module.scss";
import router from "next/router";
const array = [1, 2, 3, 4, 5, 6];
const MainPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Relaxing</h2>
      <ul className={styles.carousel_container}>
        {array.map((e) => (
          <li key={e}>
            <div className={styles.card_figure}>
              <div className={styles.card_figure_image}>
                <img
                  aria-hidden="false"
                  draggable="false"
                  loading="lazy"
                  src="https://lite-images-i.scdn.co/image/ab67706f000000028f6675edec5c63b6dc995858"
                  onClick={() => router.push("/albums/1")}
                />
              </div>
              <figcaption>Title of album</figcaption>
            </div>
          </li>
        ))}
      </ul>
      <h2 className={styles.title} style={{ paddingTop: "6vh" }}>
        JAZZ
      </h2>
      <ul
        className={styles.carousel_container}
        style={{ top: 0, paddingTop: "6vh" }}
      >
        {array.map((e) => (
          <li key={e}>
            <div className={styles.card_figure}>
              <div className={styles.card_figure_image}>
                <img
                  aria-hidden="false"
                  draggable="false"
                  loading="lazy"
                  src="https://lite-images-i.scdn.co/image/ab67706f000000028f6675edec5c63b6dc995858"
                  onClick={() => router.push("/albums/1")}
                />
              </div>
              <figcaption>Title of album</figcaption>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
