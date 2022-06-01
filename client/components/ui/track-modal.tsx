import React from "react";
import styles from "./track-modal.module.scss";
import { ITrack } from "../../types/track";
import Slider from "../common/slider";
const path = "http://localhost:5000/";

interface TrackModalProps {
  active: ITrack;
  isOpen: boolean;
  currentTime: number;
  duration: number;
  onOpenModal: () => void;
  averageColor: string;
}

const TrackModal: React.FC<TrackModalProps> = ({
  active,
  isOpen,
  currentTime,
  duration,
  onOpenModal,
  averageColor,
}) => {
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
              <input type="range" />
              <div className={styles.slider_track}></div>
              <div className={styles.slider_range}></div>
            </div>
            <div className={styles.duration}>
              <p>{currentTime}</p>
              <p>{duration}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TrackModal;
