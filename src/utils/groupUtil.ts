import { Group } from "../models/Group";

export function findTrackInGroup(
  trackIndex: number,
  group: Group,
) {
  return [...group.tracks, ...group.combatTracks].find(track => track.index === trackIndex);
}