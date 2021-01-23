import { Track } from "./Track";

export type Group = {
  // A unique identifier used in the app to differentiate
  //  between groups
  index: number,
  name: string,
  tracks: Track[],
  isOpen: boolean,
  volume: number
};