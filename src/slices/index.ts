import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import soundscapesReducer from "./soundscapes";

export const rootReducer = combineReducers({
  soundscapes: soundscapesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSoundscapes = () => useSelector((state: RootState) => state.soundscapes);