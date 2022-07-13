import React, { useCallback, useEffect, useRef } from "react";
import styles from "./track-modal.module.scss";
import { ITrack } from "../../types/track";
import { useActions } from "../../hooks/useActions";
const path = "http://localhost:5000/";

interface TrackModalProps {
  active: ITrack;
  isOpen: boolean;
  currentTime: number;
  duration: number;
  onOpenModal: () => void;
  averageColor: string;
  onChangeCurrentTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlay: () => void;
  pause: boolean;
  setTrackToTime: (time: number) => void;
}

const TrackModal: React.FC<TrackModalProps> = ({
  active,
  isOpen,
  currentTime,
  duration,
  onOpenModal,
  averageColor,
  onChangeCurrentTime,
  onPlay,
  pause,
  setTrackToTime,
}) => {
  const rangeRef = useRef<HTMLDivElement | null>(null);
  const { playPrevious, playNext } = useActions();
  const getPercent = useCallback(() => {
    const res = (currentTime / duration) * 100;
    return Math.round(res);
  }, [currentTime]);
  useEffect(() => {
    if (rangeRef.current) {
      rangeRef.current.style.width = `${getPercent()}%`;
    }
  }, [currentTime]);
  const getHumanReadableTime = (seconds) =>
    seconds > 3600
      ? new Date(seconds * 1000).toISOString().substring(11, 16)
      : new Date(seconds * 1000).toISOString().substring(14, 19);
  const setTime = (e) => {
    let width = window.innerWidth;
    const time = (+e.clientX - 16) / (width - 16 - width * (39 / 1035));
    setTrackToTime(time * duration);
  };
  if (!active || !isOpen) return null;
  return (
    <aside className={styles.wrap}>
      <div
        className={styles.header}
        style={{
          background: `linear-gradient(rgb(${averageColor}) -50%, transparent 80%)`,
        }}
      >
        <div className={styles.header_image_wrapper}>
          <img
            draggable={false}
            className={styles.header_image}
            src={path + active.image}
          />
        </div>
        <h1>{active.name}</h1>
        <div className={styles.header_about}>
          <p>{active.artist}</p>
        </div>
        <div className={styles.buttons_wrapper}>
          <div>
            <div className={styles.slider}>
              <input
                type="range"
                className={styles.thumb}
                value={currentTime}
                max={duration}
                onChange={onChangeCurrentTime}
              />
              <div
                ref={rangeRef}
                className={styles.slider_track}
                onClick={(e) => setTime(e)}
              ></div>
              <div
                className={styles.slider_range}
                onClick={(e) => setTime(e)}
              ></div>
            </div>
            <div className={styles.duration}>
              <p>{getHumanReadableTime(currentTime)}</p>
              <p>{getHumanReadableTime(duration)}</p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.btn_heart}>
                <i className="bi bi-heart"></i>
              </button>
              <button className={styles.btn_backward} onClick={playPrevious}>
                <i className="bi bi-skip-backward"></i>
              </button>
              {!pause ? (
                <button className={styles.btn_play} onClick={onPlay}>
                  <i className="bi bi-pause-circle-fill"></i>
                </button>
              ) : (
                <button className={styles.btn_play} onClick={onPlay}>
                  <i className="bi bi-play-circle-fill"></i>
                </button>
              )}
              <button className={styles.btn_forward} onClick={playPrevious}>
                <i className="bi bi-skip-forward"></i>
              </button>
              <button className={styles.btn_shuffle}>
                <i className="bi bi-shuffle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.return} onClick={onOpenModal}>
        <i className="bi bi-caret-down"></i>
        <span>{active.name}</span>
      </div>
    </aside>
  );
};

export default TrackModal;
