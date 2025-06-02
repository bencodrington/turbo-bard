import { MUSIC_TAG } from "../models/ObjectTypes";
import { Track } from "../models/Track";

export function isTrackMusic(track: Track) {
  return track.tags?.includes(MUSIC_TAG);
}

export function isTrackAmbiance(track: Track) {
  return !isTrackMusic(track);
}
