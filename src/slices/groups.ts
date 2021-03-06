import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "../models/SearchResult";
import { Group } from "../models/Group";
import { isLoop, isOneShot } from "../models/Track";
import { ERROR_TYPE, TrackData, TrackDataError } from "../models/DatabaseTypes";
import {
  addSearchResultToGroup,
  getNextIndex,
  getGroupByIndex,
  getTrackByIndex,
  DEFAULT_VOLUME
} from "../utils/storeUtil";

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [] as Group[],
  reducers: {
    newGroup(state, { payload }: { payload: string }) {
      state.push({
        name: payload,
        index: getNextIndex(state),
        tracks: [],
        isOpen: true,
        volume: DEFAULT_VOLUME
      });
    },
    closeAllGroups(state) {
      state.map(group => Object.assign(group, { isOpen: false }));
    },
    addSearchResult(
      state,
      { payload }: PayloadAction<{ searchResult: SearchResult, groupIndex?: number }>
    ) {
      const { searchResult, groupIndex } = payload;
      // Determine which group the new track(s) should be assigned to
      let group;
      if (groupIndex === undefined) {
        // Create new group
        group = {
          name: 'GROUP',
          index: getNextIndex(state),
          tracks: [],
          isOpen: true,
          volume: DEFAULT_VOLUME
        };
        state.unshift(group);
      } else {
        group = getGroupByIndex(groupIndex, state);
      }
      if (group === undefined) return;
      // Add track(s) to that group
      addSearchResultToGroup(searchResult, group);
    },
    removeTrack(state, { payload }: PayloadAction<{ groupIndex: number, trackIndex: number }>) {
      const { groupIndex, trackIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      if (group.tracks.length === 1 && group.tracks[0].index === trackIndex) {
        // Last track was removed, so remove this group
        return state.filter(group => group.index !== groupIndex);
      }
      group.tracks = group.tracks.filter(track => track.index !== trackIndex);
    },
    setTrackData(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      trackData: TrackData | TrackDataError
    }>) {
      const { groupIndex, trackIndex, trackData } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined) return;
      if (trackData.type === ERROR_TYPE) {
        Object.assign(track, { type: ERROR_TYPE })
        return;
      }
      Object.assign(track, trackData);
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
    setTrackIsMuted(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      isMuted: boolean
    }>) {
      const { groupIndex, trackIndex, isMuted } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined) return;
      track.isMuted = isMuted;
    },
    setTrackIsPlaying(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      isPlaying: boolean
    }>) {
      const { groupIndex, trackIndex, isPlaying } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined) return;
      track.isPlaying = isPlaying;
    },
    removeGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      return state.filter(group => group.index !== groupIndex);
    },
    setGroupIsPlaying(state, { payload }: PayloadAction<{
      groupIndex: number,
      isPlaying: boolean
    }>) {
      const { groupIndex, isPlaying } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.map(track => {
        if (isLoop(track) || isOneShot(track)) {
          track.isPlaying = isPlaying;
        }
        return track;
      });
    },
    setGroupVolume(state, { payload }: PayloadAction<{
      groupIndex: number,
      volume: number
    }>) {
      const { groupIndex, volume } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.volume = volume;
    },
    startAllInGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.forEach(track => {
        track.isPlaying = true;
      });
    },
    stopAllInGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.forEach(track => {
        track.isPlaying = false;
      });
    },
    transitionToGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      state.forEach(group => {
        group.tracks.forEach(track => {
          track.isPlaying = group.index === groupIndex;
        })
      })
    },
    setOneShotRange(state, { payload }: PayloadAction<{
      groupIndex: number,
      trackIndex: number,
      minSecondsBetween: number,
      maxSecondsBetween: number
    }>) {
      const {
        groupIndex,
        trackIndex,
        minSecondsBetween,
        maxSecondsBetween
      } = payload;
      const track = getTrackByIndex(trackIndex, groupIndex, state);
      if (track === undefined || !isOneShot(track)) return;
      track.minSecondsBetween = minSecondsBetween;
      track.maxSecondsBetween = maxSecondsBetween;
    }
  }
});

export const {
  newGroup,
  closeAllGroups,
  removeTrack,
  addSearchResult,
  setTrackData,
  setTrackVolume,
  setTrackIsMuted,
  removeGroup,
  setGroupIsPlaying,
  setGroupVolume,
  setTrackIsPlaying,
  startAllInGroup,
  stopAllInGroup,
  transitionToGroup,
  setOneShotRange
} = groupsSlice.actions;

export default groupsSlice.reducer;