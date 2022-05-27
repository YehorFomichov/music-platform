import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "../types/player";
import { ITrack } from "../types/track";

const initialState: PlayerState = {
  active: null,
  volume: 75,
  duration: 0,
  currentTime: 0,
  pause: true,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    PLAY: (state) => {
      state.pause = false;
    },
    PAUSE: (state) => {
      state.pause = true;
    },
    SET_CURRENT_TIME: (state, action) => {
      state.currentTime = action.payload;
    },
    SET_VOLUME: (state, action) => {
      state.volume = action.payload;
    },
    SET_DURATION: (state, action) => {
      state.duration = action.payload;
    },
    SET_ACTIVE: (state, action) => {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
  },
});
const { reducer: playerReducer } = playerSlice;
const { PLAY, PAUSE, SET_CURRENT_TIME, SET_DURATION, SET_ACTIVE, SET_VOLUME } =
  playerSlice.actions;
export const playTrack = () => (dispatch) => {
  dispatch(PLAY());
};
export const pauseTrack = () => (dispatch) => {
  dispatch(PAUSE());
};
export const setCurrentTime = (time: number) => (dispatch) => {
  dispatch(SET_CURRENT_TIME(time));
};
export const setVolume = (volume: number) => (dispatch) => {
  dispatch(SET_VOLUME(volume));
};
export const setDuration = (duration: number) => (dispatch) => {
  dispatch(SET_DURATION(duration));
};
export const setActiveTrack = (track: ITrack) => (dispatch) => {
  dispatch(SET_ACTIVE(track));
};
export const getPlayer = () => (state) => state.player.active;
export default playerReducer;
