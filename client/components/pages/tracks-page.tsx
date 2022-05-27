import React, { useState } from "react";
import styles from "./tracks-page.module.css";
import TrackItem from "../ui/track-item";
import { useRouter } from "next/router";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const TracksPage = () => {
  const { entities: tracks, isLoading } = useTypedSelector(
    (state) => state.tracks
  );
  const [play, setPlay] = useState("");
  const handlePlay = (id: string) => {
    setPlay(id);
  };
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>List of tracks</h1>
        <h3 onClick={() => router.push("/upload")} className={styles.upload}>
          Upload track
        </h3>
      </div>
      <div className={styles.tracksContainer}>
        {!isLoading &&
          tracks.map((track) => (
            <TrackItem
              key={track._id}
              track={track}
              isActive={track._id === play}
              onPlay={handlePlay}
            />
          ))}
      </div>
    </div>
  );
};

export default TracksPage;
