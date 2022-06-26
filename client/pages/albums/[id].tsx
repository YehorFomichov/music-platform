import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { average } from "color.js";
import styles from "../../components/pages/tracks-page.module.scss";
import TrackItem from "../../components/ui/track-item";
import albumService from "../../service/albumService";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [album, setAlbum] = useState(null);
  const loadAlbum = async () => {
    const res = await albumService.getAlbumById(id);
    setAlbum(res);
  };
  useEffect(() => {
    if (router.query?.id) {
      loadAlbum();
    }
  }, [router]);
  useEffect(() => {
    getAverageColor();
  }, [album]);
  const [aC, setAC] = useState([0, 0, 0]);
  const [play, setPlay] = useState("");
  const handlePlay = (id: string) => {
    setPlay(id);
  };
  const getAverageColor = async () => {
    if (!album) return;
    const color = await average(`http://localhost:5000/${album.image}`);
    // @ts-ignore
    setAC(color);
  };
  if (!album) return <h2>Loading...</h2>;
  return (
    <>
      <div
        className={styles.header}
        style={{
          background: `linear-gradient(rgb(${aC[0]}, ${aC[1]}, ${aC[2]}) 0%, transparent 100%)`,
        }}
      >
        <div className={styles.header_image_wrapper}>
          <img
            draggable={false}
            className={styles.header_image}
            src={`http://localhost:5000/${album.image}`}
          />
        </div>
        <h1>{album.name}</h1>
        <div className={styles.header_about}>
          <p>{album.artist}</p>
        </div>
      </div>
      <div className={styles.tracks_list_container}>
        {album?.tracks &&
          album.tracks.map((track, index) => (
            <TrackItem
              key={track._id}
              track={track}
              isActive={track._id === play}
              onPlay={handlePlay}
              index={index}
            />
          ))}
      </div>
    </>
  );
};

export default Index;
