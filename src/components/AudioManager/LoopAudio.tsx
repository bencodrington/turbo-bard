import useLoopPlayer from "../../hooks/useLoopPlayer";
import useTrackMetadata from "../../hooks/useTrackMetadata";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";

type LoopAudioProps = {
  loop: Loop | UnloadedTrack,
  groupIndex: number,
};

export default function LoopAudio({ loop, groupIndex }: LoopAudioProps) {
  const { isPlaying, volume } = loop;
  const fileName = isUnloaded(loop) ? undefined : loop.fileName;
  // Need to add useTrackMetadata to fetch the filename so we can start loading
  //  the audio.
  useTrackMetadata(loop, groupIndex);
  useLoopPlayer(volume, isPlaying, loop.shouldLoad, fileName);

  // No need to create DOM elements
  return null;
}