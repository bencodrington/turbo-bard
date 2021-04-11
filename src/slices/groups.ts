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
import { loadGroups, saveGroups } from "../services/localStorage";

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [] as Group[],
  reducers: {
    newGroup(state, { payload }: { payload: string }) {
      state.push({
        name: payload,
        index: getNextIndex(state),
        tracks: [],
        volume: DEFAULT_VOLUME
      });
      saveGroups(state);
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
          volume: DEFAULT_VOLUME
        };
        state.unshift(group);
      } else {
        group = getGroupByIndex(groupIndex, state);
      }
      if (group === undefined) return;
      // Add track(s) to that group
      addSearchResultToGroup(searchResult, group);
      saveGroups(state);
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
      saveGroups(state);
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
      saveGroups(state);
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
      saveGroups(state);
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
      saveGroups(state);
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
      saveGroups(state);
    },
    removeGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const newGroupList = state.filter(group => group.index !== groupIndex);
      saveGroups(newGroupList);
      return newGroupList;
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
      saveGroups(state);
    },
    setGroupVolume(state, { payload }: PayloadAction<{
      groupIndex: number,
      volume: number
    }>) {
      const { groupIndex, volume } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.volume = volume;
      saveGroups(state);
    },
    startAllInGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.forEach(track => {
        track.isPlaying = true;
      });
      saveGroups(state);
    },
    stopAllInGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      const group = getGroupByIndex(groupIndex, state);
      if (group === undefined) return;
      group.tracks.forEach(track => {
        track.isPlaying = false;
      });
      saveGroups(state);
    },
    transitionToGroup(state, { payload }: PayloadAction<{ groupIndex: number }>) {
      const { groupIndex } = payload;
      state.forEach(group => {
        group.tracks.forEach(track => {
          track.isPlaying = group.index === groupIndex;
        })
      })
      saveGroups(state);
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
      saveGroups(state);
    },
    loadGroupsFromStorage(state) {
      const newState = [
        ...state,
        ...loadGroups()
      ];
      saveGroups(newState);
      return newState;
    }
  }
});

export const {
  newGroup,
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
  setOneShotRange,
  loadGroupsFromStorage
} = groupsSlice.actions;

export default groupsSlice.reducer;