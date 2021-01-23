import { SearchResult } from "../models/SearchResult";
import { Group } from "../models/Group";

const DEFAULT_VOLUME = 0.7;

export function getNextIndex(indexedItems: { index: number }[]) {
  let maxIndex = -1;
  indexedItems.forEach(indexedItems => {
    if (indexedItems.index > maxIndex) {
      maxIndex = indexedItems.index;
    }
  });
  return maxIndex + 1;
}

export function addSearchResultToSoundscape(
  searchResult: SearchResult,
  soundscape: Group
) {
  const { id, name, type, tags, tracks } = searchResult;
  if (tracks !== undefined) {
    // Result is a pack
    tracks.forEach(track => {
      const { id, volume, oneShotConfig } = track;
      console.log(oneShotConfig); // TODO: use oneshotconfig
      soundscape.tracks.push({
        id,
        volume,
        index: getNextIndex(soundscape.tracks)
      });
    })
    return;
  }
  // Result is an individual track
  soundscape.tracks.push({
    id,
    index: getNextIndex(soundscape.tracks),
    name,
    type,
    tags,
    volume: DEFAULT_VOLUME
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
    .find(track => track.index === trackIndex);
}