import {
  pauseTrack,
  playNext,
  playPrevious,
  playTrack,
  setActivePlaylist,
  setActiveTrack,
  setCurrentActiveTrackIndex,
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
  setActivePlaylist,
  setCurrentActiveTrackIndex,
  playNext,
  playPrevious,
};
