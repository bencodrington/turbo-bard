import { Track } from "./Track";
import { AudioList } from "../services/audio";

export type Soundscape = {
  // A unique identifier used in the app to differentiate
  //  between soundscapes
  index: number,
  name: string,
  tracks: Track[],
  // A unique identifier used to fetch the details of a
  //  predefined soundscape. It is `undefined` when a
  //  soundscape is created from scratch
  sourceId?: string,
  isOpen: boolean,
  audio: AudioList
};