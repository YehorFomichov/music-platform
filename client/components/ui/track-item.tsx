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
  onSetActiveTrack: () => void;
}

const TrackItem: React.FC<TrackProps> = ({
  track,
  onPlay,
  index,
  onSetActiveTrack,
}) => {
  const router = useRouter();
  const { active, pause } = useTypedSelector((state) => state.player);
  const { playTrack, pauseTrack } = useActions();
  const play = (e) => {
    e.stopPropagation();
    if (active?._id !== track._id) {
      onSetActiveTrack();
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
};

export default TrackItem;
