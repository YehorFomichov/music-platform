import { createSlice } from "@reduxjs/toolkit";
import { ITrack } from "../types/track";
import trackService from "../service/tracksService";
interface TracksState {
  entities: null | ITrack[];
  isLoading: boolean;
  error: null | string;
}
const initialState: TracksState = {
  entities: null,
  isLoading: true,
  error: null,
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    tracksRequested: (state) => {
      state.isLoading = true;
    },
    tracksReceived: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    tracksRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
const { reducer: trackReducer } = trackSlice;
const { tracksRequested, tracksReceived, tracksRequestFailed } =
  trackSlice.actions;

export const loadTracks =
  (count: number, offset: number) => async (dispatch) => {
    dispatch(tracksRequested());
    try {
      const tracks = await trackService.getTracks(count, offset);
      dispatch(tracksReceived(tracks));
      return tracks;
    } catch (e) {
      dispatch(tracksRequestFailed(e.message));
    }
  };
export default trackReducer;
