import { ERROR_TYPE } from "./DatabaseTypes";
import { ObjectType } from "./ObjectTypes";

export type TrackMetadata = {
  name: string,
  source: {
    author?: string,
    urls: string[]
  },
  tags: string[]
};

/// Stored locally in the store

export type Loop = {
  id: string,
  index: number,
  volume: number,
  isMuted: boolean,
  isPlaying: boolean,
  fileName: string
} & TrackMetadata;

export type OneShot = {
  id: string,
  index: number,
  volume: number,
  isMuted: boolean,
  isPlaying: boolean,
  samples: string[],
  minSecondsBetween: number,
  maxSecondsBetween: number
} & TrackMetadata;

export type UnloadedTrack = {
  id: string,
  index: number,
  volume: number,
  isMuted: boolean,
  isPlaying: boolean,
  // These optional properties are present when loading from a track search result,
  //  but not when loading from a pack
  name?: string,
  type?: ObjectType | typeof ERROR_TYPE,
  tags?: string[]
};

export function isLoop(track: Track): track is Loop {
  return (track as Loop).fileName !== undefined;
}

export function isOneShot(track: Track): track is OneShot {
  return (track as OneShot).samples !== undefined;
}

export function isUnloaded(track: Track): track is UnloadedTrack {
  return (track as Loop).fileName === undefined &&
    (track as OneShot).samples === undefined;
}

export function isUnloadedLoop(track: Track): track is UnloadedTrack {
  return isUnloaded(track) && track.type === ObjectType.LOOP;
}

export type Track = Loop | OneShot | UnloadedTrack;