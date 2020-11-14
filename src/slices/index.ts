import { combineReducers } from "@reduxjs/toolkit";
import soundscapesSlice from "./soundscapes";

export const rootReducer = combineReducers({
  reducer: soundscapesSlice.reducer
});