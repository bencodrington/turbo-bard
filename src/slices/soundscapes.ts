import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "../models/SearchResult";
import { Group } from "../models/Group";
import { isLoop, isOneShot } from "../models/Track";
import { ERROR_TYPE, TrackData, TrackDataError } from "../models/DatabaseTypes";
import {
  addSearchResultToSoundscape,
  getNextIndex,
  getGroupByIndex,
  getTrackByIndex
} from "../utils/storeUtil";

const soundscapesSlice = createSlice({
  name: 'soundscapes',
  initialState: [] as Group[],
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
    closeAllSoundscapes(state) {
      state.map(soundscape => Object.assign(soundscape, { isOpen: false }));
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
          name: 'UNTITLED GROUP',
          index: getNextIndex(state),
          tracks: [],
          isOpen: true,
          volume: 0.7
        };
        state.push(group);
      } else {
        group = getGroupByIndex(groupIndex, state);
      }
      if (group === undefined) return;
      addSearchResultToSoundscape(searchResult, group);
    },
    removeTrack(state, { payload }: PayloadAction<{ soundscapeIndex: number, trackIndex: number }>) {
      const { soundscapeIndex, trackIndex } = payload;
      const soundscape = getGroupByIndex(soundscapeIndex, state);
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
      groupIndex: number,
      trackIndex: number,
      volume: number
    }>) {
      const { groupIndex, trackIndex, volume } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
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
      const soundscape = getGroupByIndex(soundscapeIndex, state);
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
      const soundscape = getGroupByIndex(soundscapeIndex, state);
      if (soundscape === undefined) return;
      soundscape.volume = volume;
    }
  }
});

export const {
  newSoundscape,
  closeAllSoundscapes,
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