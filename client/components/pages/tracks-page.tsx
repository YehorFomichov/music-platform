import React, { useState } from "react";
import styles from "./tracks-page.module.css";
import { IComment, ITrack } from "../../types/track";
import Track from "../ui/track";
import { useRouter } from "next/router";

const tracks = [
  {
    _id: "asdqw2",
    name: "Snow",
    artist: "RHCP",
    image:
      "https://unsplash.com/photos/79-UsUCtTYA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjB8fGFsYnVtfGVufDB8fHx8MTY1Mjg2NjM2Ng&force=true&w=640",
    audio: "sdaq path",
    lyrics: "snow lyrics",
    listens: 0,
    comments: [{ _id: "asd1", username: "Gregory", text: "some text" }],
  },
];

const TracksPage = () => {
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
        {tracks.map((track) => (
          <Track
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
