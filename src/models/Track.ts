import { ObjectType } from "./ObjectTypes";

export type TrackMetadata = {
  name: string,
  source: {
    author?: string,
    url: string
  }
};

export type Loop = {
  id: string,
  index: number,
  trackMetadata: TrackMetadata
  volume: number,
  isMuted: boolean,
  isPlaying: boolean,
  fileSource: string
};

export type OneShot = {
  id: string,
  index: number,
  trackMetadata: TrackMetadata
  volume: number,
  isMuted: boolean,
  isPlaying: boolean,
  fileSources: string[]
}

export type UnloadedTrack = {
  id: string,
  index: number,
  name: string,
  type: ObjectType,
  tags: string[]
}

export function isLoop(track: Track): track is Loop {
  return (track as Loop).fileSource !== undefined;
}

export function isOneShot(track: Track): track is OneShot {
  return (track as OneShot).fileSources !== undefined;
}

export type Track = Loop | OneShot | UnloadedTrack;