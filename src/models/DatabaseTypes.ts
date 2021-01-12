import { TrackMetadata } from "../models/Track";
import { ObjectType } from "./ObjectTypes";

export type LoopData = {
  id: string,
  type: ObjectType.LOOP
  fileName: string
} & TrackMetadata;

export type OneShotData = {
  id: string,
  type: ObjectType.ONESHOT
  trackMetadata: TrackMetadata,
  samples: string[]
} & TrackMetadata;

export const ERROR_TYPE = 'ERROR';

export type TrackDataError = {
  id: string,
  type: typeof ERROR_TYPE
};

export function isLoopData(trackData: TrackData): trackData is LoopData {
  return (trackData as LoopData).fileName !== undefined;
}

export function isOneShotData(trackData: TrackData): trackData is OneShotData {
  return (trackData as OneShotData).samples !== undefined;
}

export type TrackData = LoopData | OneShotData;