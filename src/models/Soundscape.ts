import { Track } from "./Track";
import { AudioList } from "../services/audio";

export type Soundscape = {
  id: number,
  name: string,
  tracks: Track[],
  sourceId?: string,
  isOpen: boolean,
  audio: AudioList
};