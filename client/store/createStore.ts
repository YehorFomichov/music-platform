import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./trackSlice";
import playerReducer from "./playerSlice";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";

export const rootReducer = combineReducers({
  tracks: trackReducer,
  player: playerReducer,
  modal: modalReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export function createStore() {
  return configureStore({ reducer: rootReducer });
}
