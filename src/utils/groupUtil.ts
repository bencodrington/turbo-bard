import { Group } from "../models/Group";

export function findTrackInGroup(trackIndex: number, group: Group) {
  return [...group.tracks, ...group.combatTracks].find(
    (track) => track.index === trackIndex
  );
}

export function isGroupPlayable(group: Group) {
  return group.tracks.length > 0 || group.combatTracks.length > 0;
}
