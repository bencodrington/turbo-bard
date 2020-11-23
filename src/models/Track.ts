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

export type Track = Loop | OneShot;