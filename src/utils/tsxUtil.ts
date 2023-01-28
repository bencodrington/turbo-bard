import { Group } from "../models/Group";
import { Track } from "../models/Track";

export function constructKey(group: Group, track: Track) {
  return group.index + '-' + track.index;
}