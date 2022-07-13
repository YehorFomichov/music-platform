import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { average } from "color.js";
import styles from "../../components/pages/tracks-page.module.scss";
import TrackItem from "../../components/ui/track-item";
import albumService from "../../service/albumService";
import { useActions } from "../../hooks/useActions";
import { ITrack } from "../../types/track";
import { setCurrentActiveTrackIndex } from "../../store/playerSlice";

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
  const { setActiveTrack, setActivePlaylist, setCurrentActiveTrackIndex } =
    useActions();
  function handleSetActiveTrack(track: ITrack, index: number) {
    setActiveTrack(track);
    setActivePlaylist(album.tracks);
    setCurrentActiveTrackIndex(index);
  }
  if (!album) return <h2>Loading...</h2>;

  return (
    <>
      <div
        className={styles.container}
        style={{
          background: `linear-gradient(rgb(${aC[0]}, ${aC[1]}, ${aC[2]}) 0%, transparent 60%)`,
        }}
      ></div>
      <div
        className={styles.bg_image}
        style={{ backgroundImage: `url(http://localhost:5000/${album.image})` }}
      ></div>
      <div className={styles.header}>
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
              onSetActiveTrack={() => handleSetActiveTrack(track, index)}
            />
          ))}
      </div>
      {play && <div className={styles.gap}></div>}
    </>
  );
};
export default Index;
