import React, { useState } from "react";
import styles from "../../styles/track-page.module.css";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import trackService from "../../service/tracksService";
import httpService from "../../service/httpService";
import axios from "axios";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState(serverTrack);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.return}>
        <button onClick={() => router.push("/tracks")}>
          Return to tracks list
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={"http://localhost:5000/" + track.image} />
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
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`http://localhost:5000/tracks/${params.id}`);
  return {
    props: {
      serverTrack: data,
    },
  };
};

export default TrackPage;
