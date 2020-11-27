import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "../models/SearchResult";
import { Soundscape } from "../models/Soundscape";
import { Track } from "../models/Track";
import audioService from "../services/audio";
import { addSearchResultToSoundscape, getNextIndex } from "../utils/storeUtil";

const soundscapesSlice = createSlice({
  name: 'soundscapes',
  initialState: [] as Soundscape[],
  reducers: {
    newSoundscape(state, { payload }: { payload: string }) {
      state.push({
        name: payload,
        index: getNextIndex(state),
        tracks: [],
        isOpen: true,
        audio: audioService.newAudio()
      });
    },
    cloneSoundscape(state, { payload }: PayloadAction<{ name: string, sourceId: string }>) {
      const { name, sourceId } = payload;
      state.push({
        name,
        index: getNextIndex(state),
        tracks: [],
        sourceId,
        isOpen: true,
        audio: audioService.newAudio()
      });
    },
    closeAllSoundscapes(state) {
      state.map(soundscape => Object.assign(soundscape, { isOpen: false }));
    },
    setTracks(state, { payload }: PayloadAction<{ soundscapeIndex: number, tracks: Track[] }>) {
      const { soundscapeIndex, tracks } = payload;
      const soundscape = state.find(soundscape => soundscape.index === soundscapeIndex);
      if (soundscape === undefined) return;
      let index = getNextIndex(soundscape.tracks);
      // Give each track an index to uniquely identify it
      soundscape.tracks = tracks.map(track => {
        const trackWithIndex = Object.assign(track, { index });
        index++;
        return trackWithIndex;
      });
    },
    addSearchResultToOpenSoundscape(state, { payload }: PayloadAction<SearchResult>) {
      const soundscape = state.find(soundscape => soundscape.isOpen);
      if (soundscape === undefined) return;
      addSearchResultToSoundscape(payload, soundscape);
    },
    removeTrack(state, { payload }: PayloadAction<{ soundscapeIndex: number, trackIndex: number }>) {
      const { soundscapeIndex, trackIndex } = payload;
      const soundscape = state.find(soundscape => soundscape.index === soundscapeIndex);
      if (soundscape === undefined) return;
      soundscape.tracks = soundscape.tracks.filter(track => track.index !== trackIndex);
      if (soundscape.tracks.length === 0) {
        soundscape.isOpen = false;
      }
    }
  }
});

export const {
  newSoundscape,
  cloneSoundscape,
  closeAllSoundscapes,
  setTracks,
  removeTrack,
  addSearchResultToOpenSoundscape
} = soundscapesSlice.actions;

export default soundscapesSlice.reducer;