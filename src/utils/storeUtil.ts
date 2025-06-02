import { SearchResult } from "../models/SearchResult";
import { Group } from "../models/Group";
import { findTrackInGroup } from "./groupUtil";
import { isTrackAmbiance } from "./trackUtil";

export const DEFAULT_GROUP_VOLUME = 1;
export const DEFAULT_TRACK_VOLUME = 0.7;

export function getNextIndex(indexedItems: { index: number }[]) {
  let maxIndex = -1;
  indexedItems.forEach((indexedItems) => {
    if (indexedItems.index > maxIndex) {
      maxIndex = indexedItems.index;
    }
  });
  return maxIndex + 1;
}

export function addSearchResultToGroup(
  searchResult: SearchResult,
  group: Group,
  shouldAddToCombatSection: boolean
) {
  const { id, name, type, tags, tracks } = searchResult;
  if (tracks !== undefined) {
    // Result is a pack
    tracks.forEach((track) => {
      const { id, volume, oneShotConfig } = track;
      const newTrackObject = {
        id,
        volume,
        isMuted: false,
        index: getNextIndex([...group.tracks, ...group.combatTracks]),
        isPlaying: isGroupPlaying(group),
        shouldLoad: true,
        minSecondsBetween: oneShotConfig?.minSecondsBetween,
        maxSecondsBetween: oneShotConfig?.maxSecondsBetween,
      };
      group.tracks.push(newTrackObject);
    });
    return;
  }
  // Result is an individual track
  const newTrackObject = {
    id,
    index: getNextIndex([...group.tracks, ...group.combatTracks]),
    name,
    type,
    tags,
    volume: DEFAULT_TRACK_VOLUME,
    isMuted: false,
    isPlaying: isGroupPlaying(group),
    shouldLoad: true,
  };
  if (shouldAddToCombatSection) {
    group.combatTracks.push(newTrackObject);
  } else {
    group.tracks.push(newTrackObject);
  }
}

export function getGroupByIndex(groupIndex: number, groups: Group[]) {
  return groups.find((group) => group.index === groupIndex);
}

export function getTrackByIndex(
  trackIndex: number,
  groupIndex: number,
  groups: Group[]
) {
  const group = getGroupByIndex(groupIndex, groups);
  if (group === undefined) {
    return;
  }
  return findTrackInGroup(trackIndex, group);
}

export function isGroupPlaying(group: Group) {
  return (
    group.tracks.some((track) => track.isPlaying) ||
    group.combatTracks.some((track) => track.isPlaying)
  );
}

export function getPlayingGroup(groups: Group[]) {
  return groups.find(isGroupPlaying);
}

export function playGroup(group: Group, startInCombatMode = false) {
  if (group.tracks.length > 0 && startInCombatMode === false) {
    // If group has non-combat tracks and combat mode is not active,
    //  play non-combat tracks.
    group.tracks.forEach((track) => {
      track.isPlaying = true;
    });
    group.combatTracks.forEach((track) => {
      track.isPlaying = false;
    });
  } else {
    // Group has no combat tracks or the combat toggle is active, so play in
    //  combat mode.
    // This means play all combat tracks and all non-combat ambience, and stop
    //  non-combat music.
    group.combatTracks.forEach((track) => {
      track.isPlaying = true;
    });
    group.tracks.forEach((track) => {
      track.isPlaying = isTrackAmbiance(track);
    });
  }
}

export function stopGroup(group: Group) {
  group.tracks.forEach((track) => {
    track.isPlaying = false;
  });
  group.combatTracks.forEach((track) => {
    track.isPlaying = false;
  });
}
