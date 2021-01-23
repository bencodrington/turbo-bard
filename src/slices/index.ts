import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import groupsReducer from "./soundscapes";

export const rootReducer = combineReducers({
  groups: groupsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSoundscapes = () => useSelector((state: RootState) => state.groups);