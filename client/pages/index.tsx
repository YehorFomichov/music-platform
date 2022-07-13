import React, { useEffect, useRef, useState } from "react";
import styles from "../components/pages/main-page.module.scss";
import router from "next/router";
import albumService from "../service/albumService";
import { IAlbum } from "../types/albums";
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
      <div className={styles.banner}>
        <h1>Welcome to BEAT</h1>
        <p>Here you can upload and listen your favorite music for FREE!</p>
      </div>
      <div className={styles.category_header}>
        <h1>Trending Albums:</h1>
      </div>
      <div className={styles.albums_list}>
        {albums.map((e) => (
          <div className={styles.card_figure} key={e._id}>
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
            <p>{e.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Index;
