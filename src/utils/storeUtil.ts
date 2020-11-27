import { SearchResult } from "../models/SearchResult";
import { Soundscape } from "../models/Soundscape";

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
  soundscape: Soundscape
) {
  const { id, name, type, tags } = searchResult;
  soundscape.tracks.push({
    id,
    index: getNextIndex(soundscape.tracks),
    name,
    type,
    tags
  });
}