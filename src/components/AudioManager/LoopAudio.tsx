import useLoopPlayer from "../../hooks/useLoopPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";

type LoopAudioProps = {
  loop: Loop | UnloadedTrack,
  groupIndex: number,
};

export default function LoopAudio({ loop, groupIndex }: LoopAudioProps) {
  const { id, index, isPlaying } = loop;
  const {
    volume,
    isMuted,
  } = useVolume({
    initialVolume: loop.volume,
    isInitiallyMuted: loop.isMuted,
    groupIndex,
    trackIndex: index
  });
  const computedVolume = isMuted
    ? 0
    : volume;
  const fileName = isUnloaded(loop) ? undefined : loop.fileName;
  // Need to add useTrackData to fetch the filename so we can start loading the
  //  audio.
  useTrackData(id, index, groupIndex, !isUnloaded(loop));
  useLoopPlayer(computedVolume, isPlaying, loop.shouldLoad, fileName);

  // No need to create DOM elements
  return null;
}