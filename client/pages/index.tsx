import React, { useEffect, useState } from "react";
import styles from "../components/pages/main-page.module.scss";
import router from "next/router";
import albumService from "../service/albumService";
import { IAlbum } from "../types/albums";
import { useTypedSelector } from "../hooks/useTypedSelector";
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<IAlbum[] | null>(null);
  const loadAlbums: () => void = async () => {
    const data = await albumService.getAlbums();
    setAlbums(data);
    setIsLoading(false);
  };
  useEffect(() => {
    loadAlbums();
  }, []);
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Relaxing</h2>
      <ul className={styles.carousel_container}>
        {albums.map((e) => (
          <li key={e._id}>
            <div className={styles.card_figure}>
              <div className={styles.card_figure_image}>
                <img
                  aria-hidden="false"
                  draggable="false"
                  loading="lazy"
                  src={`http://localhost:5000/${e.image}`}
                  onClick={() => router.push(`/albums/${e._id}`)}
                />
              </div>
              <figcaption>{e.name}</figcaption>
            </div>
          </li>
        ))}
      </ul>
      <h2 className={styles.title} style={{ paddingTop: "6vh" }}>
        JAZZ
      </h2>
      <ul className={styles.carousel_container}>
        {albums.map((e) => (
          <li key={e._id}>
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
export default Index;
