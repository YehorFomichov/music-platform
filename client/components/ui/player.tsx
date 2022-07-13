import React, { useEffect, useState } from "react";
import styles from "./player.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { average } from "color.js";
import TrackModalModule from "./track-modal";
const path = "http://localhost:5000/";
let audio;

const Player = () => {
  const [aC, setAC] = useState([0, 0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pause, volume, active, duration, currentTime, currentPlaylist } =
    useTypedSelector((state) => state.player);
  const {
    playTrack,
    pauseTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    playNext,
  } = useActions();
  const setAverageColor = async () => {
    if (!active) return;
    const color = await average(`http://localhost:5000/${active.image}`);
    // @ts-ignore
    setAC(color);
  };
  const openModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
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
    } else {
      pauseTrack();
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
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
    }
    setAverageColor();
  }, [active]);
  useEffect(() => {
    if (!active) return;
    if (!pause) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [pause]);
  //          Plays Next When Song Ends           //
  useEffect(() => {
    if (!currentPlaylist && !active) return;
    if (duration === currentTime) {
      playNext();
    }
  }, [currentTime]);
  if (!active) {
    return null;
  }
  return (
    <>
      <div className={styles.player_container}>
        <div
          className={styles.player}
          style={{ backgroundColor: `rgb(${aC[0]}, ${aC[1]}, ${aC[2]}, 0.5)` }}
        >
          <div className={styles.track_container}>
            <img src={path + active.image} />
            <div className={styles.track_about} onClick={openModal}>
              <p>
                <b>{active.name}</b>
              </p>
              <p>{active.artist}</p>
            </div>
            {!pause ? (
              <div className={styles.play_button} onClick={play}>
                <i className="bi bi-pause-circle"></i>
              </div>
            ) : (
              <div className={styles.play_button} onClick={play}>
                <i className="bi bi-play-circle"></i>
              </div>
            )}
          </div>
        </div>
      </div>
      <TrackModalModule
        active={active}
        isOpen={isModalOpen}
        duration={duration}
        currentTime={currentTime}
        onOpenModal={openModal}
        onChangeCurrentTime={changeCurrentTime}
        averageColor={`${aC[0]}, ${aC[1]}, ${aC[2]}`}
        onPlay={play}
        pause={pause}
      />
    </>
  );
};

export default Player;
