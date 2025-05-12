import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import groupsReducer from "./groups";
import oneShotStatesReducer from "./oneShotStates";

export const rootReducer = combineReducers({
  groups: groupsReducer,
  oneShotStates: oneShotStatesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useGroups = () => useSelector((state: RootState) => state.groups);
export const useOneShotStates = () =>
  useSelector((state: RootState) => state.oneShotStates);
