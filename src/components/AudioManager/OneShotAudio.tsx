import useOneShotPlayer from "../../hooks/useOneShotPlayer";
import useTrackMetadata from "../../hooks/useTrackMetadata";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";

const DEFAULT_MIN_TIME_BETWEEN = 5;
const DEFAULT_MAX_TIME_BETWEEN = 10;

type OneShotAudioProps = {
  oneShot: OneShot | UnloadedTrack,
  groupIndex: number,
};

export default function OneShotAudio({ oneShot, groupIndex }: OneShotAudioProps) {
  const { isPlaying, volume } = oneShot;
  const samples = isUnloaded(oneShot) ? [] : oneShot.samples;
  const minSecondsBetween = (oneShot as OneShot).minSecondsBetween ?? DEFAULT_MIN_TIME_BETWEEN;
  const maxSecondsBetween = (oneShot as OneShot).maxSecondsBetween ?? DEFAULT_MAX_TIME_BETWEEN;
  // Need to add useTrackMetadata to fetch the samples so we can start loading
  //  the audio.
  useTrackMetadata(oneShot, groupIndex);
  useOneShotPlayer(samples, volume, minSecondsBetween, maxSecondsBetween, isPlaying, { current: null });

  // No need to create DOM elements
  return null;
}