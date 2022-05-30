import React, { useEffect, useState } from "react";
import styles from "./tracks-page.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { average } from "color.js";
import { useRouter } from "next/router";
import TrackItem from "../ui/track-item";

const TracksPage = () => {
  const router = useRouter();
  const [aC, setAC] = useState([0, 0, 0]);
  const { entities: tracks, isLoading } = useTypedSelector(
    (state) => state.tracks
  );
  const [play, setPlay] = useState("");
  const handlePlay = (id: string) => {
    setPlay(id);
  };
  const getAverageColor = async () => {
    const color = await average(
      "https://i.scdn.co/image/ab67706f0000000350e3e91b7010bcce06459a10"
    );
    // @ts-ignore
    setAC(color);
  };
  useEffect(() => {
    getAverageColor();
  }, []);
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
            src={
              "https://i.scdn.co/image/ab67706f0000000350e3e91b7010bcce06459a10"
            }
          />
        </div>
        <h1>Album name</h1>
        <div className={styles.header_about}>
          <p>Album description</p>
        </div>
      </div>
      <div className={styles.tracks_list_container}>
        {!isLoading &&
          tracks.map((track, index) => (
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

export default TracksPage;
