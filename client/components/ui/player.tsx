import React, { useEffect } from "react";
import styles from "./player.module.css";
import TrackProgress from "../common/track-progress";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

let audio;
let audioPath =
  "http://localhost:5000/audio/d5ebc703-2a47-456f-ba1a-45cb3b9578b1.mp3";

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const {
    playTrack,
    pauseTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
    }
  }, [active]);
  const setAudio = () => {
    if (active) {
      audio.src = `http://localhost:5000/${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
      audio.play();
      playTrack();
    }
  };
  function play() {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  }
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };
  if (!active) {
    return null;
  }
  return (
    <div className={styles.player}>
      {!pause ? (
        <div className={styles.btn} onClick={play}>
          <i className="bi bi-pause-circle"></i>
        </div>
      ) : (
        <div className={styles.btn} onClick={play}>
          <i className="bi bi-play-circle"></i>
        </div>
      )}
      <div>{active?.name}</div>
      <div>{active?.artist}</div>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <i className="bi bi-volume-up" style={{ fontSize: "32px" }}></i>
        <TrackProgress left={volume} right={100} onChange={changeVolume} />
      </div>
    </div>
  );
};

export default Player;
