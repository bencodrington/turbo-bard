import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Soundscape } from "../models/Soundscape";

const soundscapesSlice = createSlice({
  name: 'soundscapes',
  initialState: [] as Soundscape[],
  reducers: {
    newSoundscape(state, { payload }: { payload: string }) {
      state.push({
        name: payload,
        id: state.length,
        tracks: [],
        isOpen: true
      });
    },
    cloneSoundscape(state, { payload }: PayloadAction<{ name: string, sourceId: string }>) {
      const { name, sourceId } = payload;
      state.push({
        name,
        id: state.length,
        tracks: [],
        sourceId,
        isOpen: true
      });
    },
    closeAllSoundscapes(state) {
      state.map(soundscape => Object.assign(soundscape, {isOpen: false}));
    }
  }
});

export const { newSoundscape, cloneSoundscape, closeAllSoundscapes } = soundscapesSlice.actions;

export default soundscapesSlice.reducer;