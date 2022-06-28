import {
  pauseTrack,
  playTrack,
  setActiveTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from "../playerSlice";
import { loadTracks } from "../trackSlice";
import { openModal, closeModal } from "../modalSlice";
export default {
  playTrack,
  pauseTrack,
  setCurrentTime,
  setVolume,
  setDuration,
  setActiveTrack,
  loadTracks,
  openModal,
  closeModal,
};
