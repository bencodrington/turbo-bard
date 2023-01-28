import useLoopPlayer from "../../hooks/useLoopPlayer";
import useTrackData from "../../hooks/useTrackData";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";

type LoopAudioProps = {
  loop: Loop | UnloadedTrack,
  groupIndex: number,
};

export default function LoopAudio({ loop, groupIndex }: LoopAudioProps) {
  const { id, index, isPlaying, volume } = loop;
  const fileName = isUnloaded(loop) ? undefined : loop.fileName;
  // Need to add useTrackData to fetch the filename so we can start loading the
  //  audio.
  useTrackData(id, index, groupIndex, !isUnloaded(loop));
  useLoopPlayer(volume, isPlaying, loop.shouldLoad, fileName);

  // No need to create DOM elements
  return null;
}