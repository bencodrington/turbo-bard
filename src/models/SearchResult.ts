import { ObjectType } from "../models/ObjectTypes";

export type SearchResult = {
  id: string,
  name: string,
  tags: string[],
  type: ObjectType,
  tracks?: {
    id: string,
    volume: number,
    oneShotConfig?: {
      minSecondsBetween: number,
      maxSecondsBetween: number
    }
  }[]
};