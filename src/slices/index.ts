import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import groupsReducer from "./groups";

export const rootReducer = combineReducers({
  groups: groupsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useGroups = () => useSelector((state: RootState) => state.groups);