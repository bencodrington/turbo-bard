import { Soundscape } from "../models/Soundscape";

export function getNextTrackIndex(soundscape: Soundscape) {
  let maxIndex = -1;
  soundscape.tracks.forEach(track => {
    if (track.index > maxIndex) {
      maxIndex = track.index;
    }
  });
  return maxIndex + 1;
}