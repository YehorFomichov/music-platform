import React from "react";
import styles from "./track.module.css";
import { ITrack } from "../../types/track";
import { useRouter } from "next/router";

interface TrackProps {
  track: ITrack;
  isActive?: boolean;
  onPlay: (id: string) => void;
}

const Track: React.FC<TrackProps> = ({ track, isActive, onPlay }) => {
  const router = useRouter();
  return (
    <div
      className={styles.trackElement}
      onClick={() => router.push(`/tracks/${track._id}`)}
    >
      {isActive ? (
        <div className={styles.btn} onClick={(e) => e.stopPropagation()}>
          <i className="bi bi-pause-circle" onClick={() => onPlay("")}></i>
        </div>
      ) : (
        <div className={styles.btn} onClick={(e) => e.stopPropagation()}>
          <i
            className="bi bi-play-circle"
            onClick={() => onPlay(track._id)}
          ></i>
        </div>
      )}
      <div
        className={styles.trackImage}
        style={{ backgroundImage: `url("${track.image}")` }}
      ></div>
      <div className={styles.info}>
        <h5 className={styles.trackName}>{track.name}</h5>
        <h5 className={styles.trackArtist}>{track.artist}</h5>
      </div>
      {isActive && <div className={styles.playback}>02:42/03:15</div>}
    </div>
  );
};

export default Track;
