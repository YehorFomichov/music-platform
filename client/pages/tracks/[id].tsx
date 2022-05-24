import React from "react";
import { ITrack } from "../../types/track";
import styles from "../../styles/track-page.module.css";
import { useRouter } from "next/router";
const trackData = {
  _id: "asdqw2",
  name: "Snow",
  artist: "RHCP",
  image:
    "https://unsplash.com/photos/79-UsUCtTYA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjB8fGFsYnVtfGVufDB8fHx8MTY1Mjg2NjM2Ng&force=true&w=640",
  audio: "sdaq path",
  lyrics: "snow lyrics",
  listens: 0,
  comments: [{ _id: "asd1", username: "Gregory", text: "some text" }],
};

const TrackPage = () => {
  const router = useRouter();
  const track: ITrack = trackData;
  return (
    <div className={styles.container}>
      <div className={styles.return}>
        <button onClick={() => router.push("/tracks")}>
          Return to tracks list
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={track.image} />
        </div>
        <div className={styles.about}>
          <h2 className={styles.composer}>Artist: {track.artist}</h2>
          <h1 className={styles.name}>Name of track: {track.name}</h1>
          <h3 className={styles.listens}>Number of listens: {track.listens}</h3>
        </div>
      </div>
      <div className={styles.lyrics}>
        <h3>Lyrics:</h3>
        <p>{track.lyrics}</p>
      </div>
      <div className={styles.inputGroup}>
        <input />
        <label>sd</label>
        <form></form>
        <input />
        <label>ds</label>
        <form></form>
        <button>Send</button>
      </div>
    </div>
  );
};

export default TrackPage;
