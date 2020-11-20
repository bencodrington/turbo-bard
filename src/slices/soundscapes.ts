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
        tracks: []
      });
    },
    cloneSoundscape(state, { payload }: PayloadAction<{ name: string, sourceId: string }>) {
      const { name, sourceId } = payload;
      state.push({
        name,
        id: state.length,
        tracks: [],
        sourceId
      });
    }
  }
});

export const { newSoundscape, cloneSoundscape } = soundscapesSlice.actions;

export default soundscapesSlice.reducer;