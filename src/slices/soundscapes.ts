import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "../models/SearchResult";
import { Soundscape } from "../models/Soundscape";
import { isUnloaded } from "../models/Track";
import { ERROR_TYPE, TrackData } from "../services/database";
import {
  addSearchResultToSoundscape,
  getNextIndex,
  getSoundscapeByIndex,
  getTrackByIndex
} from "../utils/storeUtil";

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
      });
    },
    cloneSoundscape(state, { payload }: PayloadAction<{ name: string, sourceId: string }>) {
      const { name, sourceId } = payload;
      state.push({
        name,
        index: getNextIndex(state),
        tracks: [],
        sourceId,
        isOpen: true
      });
    },
    closeAllSoundscapes(state) {
      state.map(soundscape => Object.assign(soundscape, { isOpen: false }));
    },
    setTrackIds(state, { payload }: PayloadAction<{ soundscapeIndex: number, trackIds: string[] }>) {
      const { soundscapeIndex, trackIds } = payload;
      const soundscape = getSoundscapeByIndex(soundscapeIndex, state);
      if (soundscape === undefined) return;
      let index = getNextIndex(soundscape.tracks);
      // Give each track an index to uniquely identify it
      soundscape.tracks = trackIds.map(trackId => {
        const unloadedTrack = {
          id: trackId,
          index
        };
        index++;
        return unloadedTrack;
      });
    },
    addSearchResultToOpenSoundscape(state, { payload }: PayloadAction<SearchResult>) {
      const soundscape = state.find(soundscape => soundscape.isOpen);
      if (soundscape === undefined) return;
      addSearchResultToSoundscape(payload, soundscape);
    },
    removeTrack(state, { payload }: PayloadAction<{ soundscapeIndex: number, trackIndex: number }>) {
      const { soundscapeIndex, trackIndex } = payload;
      const soundscape = getSoundscapeByIndex(soundscapeIndex, state);
      if (soundscape === undefined) return;
      soundscape.tracks = soundscape.tracks.filter(track => track.index !== trackIndex);
    },
    setTrackData(state, { payload }: PayloadAction<{
      soundscapeIndex: number,
      trackIndex: number,
      trackData: TrackData
    }>) {
      const { soundscapeIndex, trackIndex, trackData } = payload;
      const track = getTrackByIndex(trackIndex, soundscapeIndex, state);
      if (track === undefined) return;
      if (trackData.type === ERROR_TYPE) {
        Object.assign(track, { type: ERROR_TYPE })
        return;
      }
      // TODO: initial volume should be passed in with the initial setTrackData() call
      //  immediately following database call
      Object.assign(track, { volume: 0 }, trackData);
    },
    openSoundscape(state, { payload }: PayloadAction<{ soundscapeIndex: number }>) {
      const { soundscapeIndex } = payload;
      state = state.map(soundscape => {
        soundscape.isOpen = soundscape.index === soundscapeIndex
        return soundscape;
      });
    },
    setTrackVolume(state, { payload }: PayloadAction<{
      soundscapeIndex: number,
      trackIndex: number,
      volume: number
    }>) {
      const { soundscapeIndex, trackIndex, volume } = payload;
      const track = getTrackByIndex(trackIndex, soundscapeIndex, state);
      if (track === undefined || isUnloaded(track)) return;
      track.volume = volume;
    }
  }
});

export const {
  newSoundscape,
  cloneSoundscape,
  closeAllSoundscapes,
  setTrackIds,
  removeTrack,
  addSearchResultToOpenSoundscape,
  setTrackData,
  openSoundscape,
  setTrackVolume
} = soundscapesSlice.actions;

export default soundscapesSlice.reducer;