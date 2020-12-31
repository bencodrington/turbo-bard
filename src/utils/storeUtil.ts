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
    tags,
    volume: 0.7 // TODO: extract constant
  });
}

export function getSoundscapeByIndex(
  soundscapeIndex: number,
  soundscapes: Soundscape[]
) {
  return soundscapes.find(soundscape => soundscape.index === soundscapeIndex);
}

export function getTrackByIndex(
  trackIndex: number,
  soundscapeIndex: number,
  soundscapes: Soundscape[]
) {
  return getSoundscapeByIndex(soundscapeIndex, soundscapes)
    ?.tracks
    .find(track => track.index === trackIndex);
}