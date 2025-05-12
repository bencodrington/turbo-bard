import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OneShotState } from "../models/OneShotState";

// Keeps track of how much longer before each one shot should play.
// This section of the store is not persisted when the page is reloaded.

const oneShotStatesSlice = createSlice({
  name: "oneShotStates",
  initialState: {} as { [oneShotTrackId: string]: OneShotState },
  reducers: {
    setOneShotState(
      state,
      {
        payload,
      }: PayloadAction<{ oneShotTrackId: string; oneShotState: OneShotState }>
    ) {
      state[payload.oneShotTrackId] = payload.oneShotState;
    },
    clearOneShotState(
      state,
      { payload }: PayloadAction<{ oneShotTrackId: string }>
    ) {
      delete state[payload.oneShotTrackId];
    },
    playOneShotNow(
      state,
      { payload }: PayloadAction<{ oneShotTrackId: string }>
    ) {
      state[payload.oneShotTrackId].shouldPlayNow = true;
    },
    setShouldPlayNow(
      state,
      {
        payload,
      }: PayloadAction<{ oneShotTrackId: string; shouldPlayNow: boolean }>
    ) {
      state[payload.oneShotTrackId].shouldPlayNow = payload.shouldPlayNow;
    },
    setTimerDuration(
      state,
      {
        payload,
      }: PayloadAction<{ oneShotTrackId: string; timerDuration: number }>
    ) {
      state[payload.oneShotTrackId].timerDuration = payload.timerDuration;
    },
    setTimerStartTimestamp(
      state,
      {
        payload,
      }: PayloadAction<{
        oneShotTrackId: string;
        timerStartTimestamp: number | null;
      }>
    ) {
      state[payload.oneShotTrackId].timerStartTimestamp =
        payload.timerStartTimestamp;
    },
  },
});

export const {
  setOneShotState,
  clearOneShotState,
  playOneShotNow,
  setShouldPlayNow,
  setTimerDuration,
  setTimerStartTimestamp,
} = oneShotStatesSlice.actions;

export default oneShotStatesSlice.reducer;
