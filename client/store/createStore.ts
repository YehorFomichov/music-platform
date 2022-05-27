import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./trackSlice";
import playerReducer from "./playerSlice";

export const rootReducer = combineReducers({
  tracks: trackReducer,
  player: playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export function createStore() {
  return configureStore({ reducer: rootReducer });
}
