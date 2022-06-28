import { createSlice } from "@reduxjs/toolkit";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../utils/firebase.utils";
import localStorageService from "../service/localStorage.service";
interface TracksState {
  user: null | string;
  isLoading: boolean;
  error: null | string;
}
const initialState: TracksState = localStorageService.getAccessToken()
  ? {
      user: localStorageService.getUserId(),
      isLoading: false,
      error: null,
    }
  : {
      user: null,
      isLoading: false,
      error: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userReceived: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    userRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
const { reducer: userReducer } = userSlice;
const { userRequested, userReceived, userRequestFailed } = userSlice.actions;

export const loginWithEmail = (email, password) => async (dispatch) => {
  dispatch(userRequested);
  try {
    const { user } = await signInAuthUserWithEmailAndPassword(email, password);
    await localStorageService.setTokens({
      refreshToken: user.refreshToken,
      idToken: user.accessToken,
      expiresIn: user.expires_in,
      localId: user.uid,
    });
    dispatch(userReceived(user.uid));
  } catch (e) {
    dispatch(userRequestFailed(e.message));
  }
};
export const loginWithGoogle = () => async (dispatch) => {
  dispatch(userRequested);
  try {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    console.log(user);
    await localStorageService.setTokens({
      refreshToken: user.refreshToken,
      idToken: user.accessToken,
      expiresIn: user.expires_in,
      localId: user.uid,
    });
    dispatch(userReceived(user.uid));
  } catch (e) {
    dispatch(userRequestFailed(e.message));
  }
};
export const addAlbumToUser = () => async (dispatch) => {};
export default userReducer;
