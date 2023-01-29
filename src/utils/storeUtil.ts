import { SearchResult } from "../models/SearchResult";
import { Group } from "../models/Group";

export const DEFAULT_GROUP_VOLUME = 1;
export const DEFAULT_TRACK_VOLUME = 0.7;

export function getNextIndex(indexedItems: { index: number }[]) {
  let maxIndex = -1;
  indexedItems.forEach(indexedItems => {
    if (indexedItems.index > maxIndex) {
      maxIndex = indexedItems.index;
    }
  });
  return maxIndex + 1;
}

export function addSearchResultToGroup(
  searchResult: SearchResult,
  group: Group
) {
  const { id, name, type, tags, tracks } = searchResult;
  if (tracks !== undefined) {
    // Result is a pack
    tracks.forEach(track => {
      const { id, volume, oneShotConfig } = track;
      group.tracks.push({
        id,
        volume,
        isMuted: false,
        index: getNextIndex(group.tracks),
        isPlaying: false,
        shouldLoad: true,
        minSecondsBetween: oneShotConfig?.minSecondsBetween,
        maxSecondsBetween: oneShotConfig?.maxSecondsBetween,
      });
    })
    return;
  }
  // Result is an individual track
  group.tracks.push({
    id,
    index: getNextIndex(group.tracks),
    name,
    type,
    tags,
    volume: DEFAULT_TRACK_VOLUME,
    isMuted: false,
    isPlaying: false,
    shouldLoad: true
  });
}

export function getGroupByIndex(
  groupIndex: number,
  groups: Group[]
) {
  return groups.find(group => group.index === groupIndex);
}

export function getTrackByIndex(
  trackIndex: number,
  groupIndex: number,
  groups: Group[]
) {
  return getGroupByIndex(groupIndex, groups)
    ?.tracks
    ?.find(track => track.index === trackIndex);
}

export function isGroupPlaying(group: Group) {
  return group.tracks.some(track => track.isPlaying === true);
}