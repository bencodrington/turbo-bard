import { ObjectType } from "./ObjectTypes";

export type TrackMetadata = {
  name: string,
  source: {
    author?: string,
    url: string
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
  fileSource: string
} & TrackMetadata;

export type OneShot = {
  id: string,
  index: number,
  volume: number,
  isMuted: boolean,
  isPlaying: boolean,
  fileSources: string[]
} & TrackMetadata;

export type UnloadedTrack = {
  id: string,
  index: number,
  name: string,
  type: ObjectType,
  tags: string[]
};

export function isLoop(track: Track): track is Loop {
  return (track as Loop).fileSource !== undefined;
}

export function isOneShot(track: Track): track is OneShot {
  return (track as OneShot).fileSources !== undefined;
}

export function isUnloaded(track: Track): track is UnloadedTrack {
  return (track as UnloadedTrack).name !== undefined;
}

export function isUnloadedLoop(track: Track): track is UnloadedTrack {
  return isUnloaded(track) && track.type === ObjectType.LOOP;
}

export type Track = Loop | OneShot | UnloadedTrack;