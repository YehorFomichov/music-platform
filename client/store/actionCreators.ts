import {
  pauseTrack,
  playTrack,
  setActiveTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from "./playerSlice";
import { loadTracks } from "./trackSlice";

export default {
  playTrack,
  pauseTrack,
  setCurrentTime,
  setVolume,
  setDuration,
  setActiveTrack,
  loadTracks,
};
