import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerState } from "../types/player";
import { ITrack } from "../types/track";

const initialState: PlayerState = {
  active: null,
  volume: 100,
  duration: 0,
  currentTime: 0,
  pause: true,
  currentPlaylist: null,
  activeIndex: 0,
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
      state.duration = 15;
      state.currentTime = 0;
    },
    SET_ACTIVE_PLAYLIST: (state, action: PayloadAction<ITrack[]>) => {
      state.currentPlaylist = action.payload;
      state.duration = 15;
      state.currentTime = 0;
    },
    SET_ACTIVE_INDEX: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
    NEXT: (state) => {
      state.activeIndex =
        state.currentPlaylist.length - 1 === state.activeIndex
          ? 0
          : state.activeIndex + 1;
      state.active = state.currentPlaylist[state.activeIndex];
    },
    PREVIOUS: (state) => {
      state.activeIndex =
        state.activeIndex === 0
          ? state.currentPlaylist.length - 1
          : state.activeIndex - 1;
      state.active = state.currentPlaylist[state.activeIndex];
    },
  },
});
const { reducer: playerReducer } = playerSlice;
const {
  PLAY,
  PAUSE,
  NEXT,
  PREVIOUS,
  SET_CURRENT_TIME,
  SET_DURATION,
  SET_ACTIVE,
  SET_VOLUME,
  SET_ACTIVE_PLAYLIST,
  SET_ACTIVE_INDEX,
} = playerSlice.actions;
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
export const setActivePlaylist = (playlist: ITrack[]) => (dispatch) => {
  dispatch(SET_ACTIVE_PLAYLIST(playlist));
};
export const setCurrentActiveTrackIndex = (index: number) => (dispatch) => {
  dispatch(SET_ACTIVE_INDEX(index));
};
export const playNext = () => (dispatch) => {
  dispatch(NEXT());
};
export const playPrevious = () => (dispatch) => {
  dispatch(PREVIOUS());
};
export const getPlayer = () => (state) => state.player.active;
export default playerReducer;
