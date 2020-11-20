import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Soundscape } from "../models/Soundscape";
import { Track } from "../models/Track";

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
      state.map(soundscape => Object.assign(soundscape, { isOpen: false }));
    },
    setTracks(state, { payload }: PayloadAction<{ soundscapeId: number, tracks: Track[] }>) {
      const { soundscapeId, tracks } = payload;
      const soundscape = state.find(soundscape => soundscape.id === soundscapeId);
      if (soundscape === undefined) return;
      soundscape.tracks = tracks;
    }
  }
});

export const {
  newSoundscape,
  cloneSoundscape,
  closeAllSoundscapes,
  setTracks
} = soundscapesSlice.actions;

export default soundscapesSlice.reducer;