import { Group } from "../models/Group";
import { ObjectType } from "../models/ObjectTypes";
import { SearchResult } from "../models/SearchResult";

export function findTrackInGroup(trackIndex: number, group: Group) {
  return [...group.tracks, ...group.combatTracks].find(
    (track) => track.index === trackIndex
  );
}

export function isGroupPlayable(group: Group) {
  return group.tracks.length > 0 || group.combatTracks.length > 0;
}

export function doesGroupContainSearchResult(
  trackIdsInGroup: string[],
  result: SearchResult
) {
  if (result.type === ObjectType.PACK) {
    // Return true if the group already contains every track in the pack
    return (result.tracks ?? []).every(({ id }) =>
      trackIdsInGroup.includes(id)
    );
  }
  return trackIdsInGroup.includes(result.id);
}
