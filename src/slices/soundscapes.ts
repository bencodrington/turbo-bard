import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "../models/SearchResult";
import { Soundscape } from "../models/Soundscape";
import { isLoop, isOneShot } from "../models/Track";
import { SoundscapeChild } from "../services/database";
import { ERROR_TYPE, TrackData, TrackDataError } from "../models/DatabaseTypes";
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
        volume: 0.7
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
        volume: 0.7
      });
    },
    closeAllSoundscapes(state) {
      state.map(soundscape => Object.assign(soundscape, { isOpen: false }));
    },
    setUnloadedTracks(state, { payload }: PayloadAction<{ soundscapeIndex: number, tracks: SoundscapeChild[] }>) {
      const { soundscapeIndex, tracks } = payload;
      const soundscape = getSoundscapeByIndex(soundscapeIndex, state);
      if (soundscape === undefined) return;
      let index = getNextIndex(soundscape.tracks);
      // Give each track an index to uniquely identify it
      soundscape.tracks = tracks.map(track => {
        const unloadedTrack = {
          id: track.id,
          volume: track.volume,
          index
        };
        index++;
        return unloadedTrack;
      });
    },
    addSearchResultToGroup(
      state,
      { payload }: PayloadAction<{ searchResult: SearchResult, groupIndex?: number }>
    ) {
      const { searchResult, groupIndex } = payload;
      let group;
      if (groupIndex === undefined) {
        // Create new group
        group = {
          name: 'GROUP TITLE',
          index: getNextIndex(state),
          tracks: [],
          isOpen: true,
          volume: 0.7
        };
        state.push(group);
      } else {
        group = getSoundscapeByIndex(groupIndex, state);
      }
      if (group === undefined) return;
      addSearchResultToSoundscape(searchResult, group);
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
      trackData: TrackData | TrackDataError
    }>) {
      const { soundscapeIndex, trackIndex, trackData } = payload;
      const track = getTrackByIndex(trackIndex, soundscapeIndex, state);
      if (track === undefined) return;
      if (trackData.type === ERROR_TYPE) {
        Object.assign(track, { type: ERROR_TYPE })
        return;
      }
      Object.assign(track, trackData);
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
      if (track === undefined) return;
      track.volume = volume;
    },
    removeSoundscape(state, { payload }: PayloadAction<{ soundscapeIndex: number }>) {
      const { soundscapeIndex } = payload;
      return state.filter(soundscape => soundscape.index !== soundscapeIndex);
    },
    setSoundscapeIsPlaying(state, { payload }: PayloadAction<{
      soundscapeIndex: number,
      isPlaying: boolean
    }>) {
      const { soundscapeIndex, isPlaying } = payload;
      const soundscape = getSoundscapeByIndex(soundscapeIndex, state);
      if (soundscape === undefined) return;
      soundscape.tracks.map(track => {
        if (isLoop(track) || isOneShot(track)) {
          track.isPlaying = isPlaying;
        }
        return track;
      });
    },
    setSoundscapeVolume(state, { payload }: PayloadAction<{
      soundscapeIndex: number,
      volume: number
    }>) {
      const { soundscapeIndex, volume } = payload;
      const soundscape = getSoundscapeByIndex(soundscapeIndex, state);
      if (soundscape === undefined) return;
      soundscape.volume = volume;
    }
  }
});

export const {
  newSoundscape,
  cloneSoundscape,
  closeAllSoundscapes,
  setUnloadedTracks,
  removeTrack,
  addSearchResultToGroup,
  setTrackData,
  openSoundscape,
  setTrackVolume,
  removeSoundscape,
  setSoundscapeIsPlaying,
  setSoundscapeVolume
} = soundscapesSlice.actions;

export default soundscapesSlice.reducer;