import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Soundscape } from "../models/Soundscape";
import { Track } from "../models/Track";
import audioService from "../services/audio";
import { getNextTrackIndex } from "../services/soundscape";

const soundscapesSlice = createSlice({
  name: 'soundscapes',
  initialState: [] as Soundscape[],
  reducers: {
    newSoundscape(state, { payload }: { payload: string }) {
      state.push({
        name: payload,
        id: state.length,
        tracks: [],
        isOpen: true,
        audio: audioService.newAudio()
      });
    },
    cloneSoundscape(state, { payload }: PayloadAction<{ name: string, sourceId: string }>) {
      const { name, sourceId } = payload;
      state.push({
        name,
        id: state.length,
        tracks: [],
        sourceId,
        isOpen: true,
        audio: audioService.newAudio()
      });
    },
    closeAllSoundscapes(state) {
      state.map(soundscape => Object.assign(soundscape, { isOpen: false }));
    },
    setTracks(state, { payload }: PayloadAction<{ soundscapeId: number, tracks: Track[] }>) {
      const { soundscapeId, tracks } = payload;
      const soundscape = state.find(soundscape => soundscape.id === soundscapeId);
      if (soundscape === undefined) return;
      let index = getNextTrackIndex(soundscape);
      // Give each track an index to uniquely identify it
      soundscape.tracks = tracks.map(track => {
        const trackWithIndex = Object.assign(track, { index });
        index++;
        return trackWithIndex;
      });
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