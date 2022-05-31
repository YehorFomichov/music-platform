import React from "react";
import styles from "./track-item.module.scss";
import { ITrack } from "../../types/track";
import { useRouter } from "next/router";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface TrackProps {
  track: ITrack;
  isActive?: boolean;
  onPlay: (id: string) => void;
  index: number;
}

const TrackItem: React.FC<TrackProps> = ({
  track,
  isActive,
  onPlay,
  index,
}) => {
  const router = useRouter();
  const { active, pause } = useTypedSelector((state) => state.player);
  const { playTrack, setActiveTrack, pauseTrack } = useActions();
  const play = (e) => {
    e.stopPropagation();
    if (active?._id !== track._id) {
      setActiveTrack(track);
      playTrack();
      onPlay(track._id);
    } else if (pause) {
      playTrack();
    } else {
      pauseTrack();
    }
  };
  return (
    <div className={styles.track_element_container}>
      <button onClick={play}>
        {track._id === active?._id ? (
          pause ? (
            <span className={styles.playing}>
              <i className="bi bi-play-circle"></i>
            </span>
          ) : (
            <span className={styles.playing}>
              <i className="bi bi-pause-circle"></i>
            </span>
          )
        ) : (
          <span className={styles.order}>
            <p>{index + 1}</p>
          </span>
        )}
        <div>
          <span className={styles.span_1}>{track.name}</span>
          <span className={styles.span_2}>{track.artist}</span>
        </div>
      </button>
      <span>
        <button>...</button>
      </span>
    </div>
  );
  return (
    <tbody onClick={play}>
      <tr>
        <th>{index}</th>
        <td className="d-flex flex-row align-items-center">
          <div
            className={styles.trackImage}
            style={{
              backgroundImage: `url("http://localhost:5000/${track.image}")`,
            }}
          ></div>
          {track.artist} - {track.name}
        </td>
        <td>Some album</td>
        <td>27.5.2022</td>
        <td>Duration</td>
      </tr>
    </tbody>
  );
  return (
    <div
      className={styles.trackElement}
      onClick={() => router.push(`/tracks/${track._id}`)}
    >
      {isActive ? (
        <div className={styles.btn} onClick={play}>
          <i className="bi-play-circle-fill"></i>
        </div>
      ) : (
        <div className={styles.btn} onClick={play}>
          <i
            className="bi bi-play-circle"
            onClick={() => onPlay(track._id)}
          ></i>
        </div>
      )}
      <div
        className={styles.trackImage}
        style={{
          backgroundImage: `url("http://localhost:5000/${track.image}")`,
        }}
      ></div>
      <div className={styles.info}>
        <h5 className={styles.trackName}>{track.name}</h5>
        <h5 className={styles.trackArtist}>{track.artist}</h5>
      </div>
      {isActive && <div className={styles.playback}>02:42/03:15</div>}
    </div>
  );
};

export default TrackItem;
