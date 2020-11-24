import { Track } from "./Track";
import { AudioList } from "../services/audio";

export type Soundscape = {
  index: number,
  name: string,
  tracks: Track[],
  sourceId?: string,
  isOpen: boolean,
  audio: AudioList
};