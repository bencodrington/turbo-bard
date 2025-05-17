import { useEffect } from "react";
import useOneShotPlayer from "../../hooks/useOneShotPlayer";
import useTrackMetadata from "../../hooks/useTrackMetadata";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";
import { clearOneShotState, setOneShotState } from "../../slices/oneShotStates";
import { useDispatch } from "react-redux";
import { OneShotState } from "../../models/OneShotState";

const DEFAULT_MIN_TIME_BETWEEN = 5;
const DEFAULT_MAX_TIME_BETWEEN = 10;

type OneShotAudioProps = {
  oneShotTrackId: string;
  oneShot: OneShot | UnloadedTrack;
  groupIndex: number;
};

export default function OneShotAudio({
  oneShotTrackId,
  oneShot,
  groupIndex,
}: OneShotAudioProps) {
  const { isPlaying, volume } = oneShot;
  const samples = isUnloaded(oneShot) ? [] : oneShot.samples;
  const minSecondsBetween =
    (oneShot as OneShot).minSecondsBetween ?? DEFAULT_MIN_TIME_BETWEEN;
  const maxSecondsBetween =
    (oneShot as OneShot).maxSecondsBetween ?? DEFAULT_MAX_TIME_BETWEEN;

  const dispatch = useDispatch();

  // When this component is created, create a new state object in the store
  useEffect(() => {
    const state: OneShotState = {
      shouldPlayNow: false,
      userTriggeredPlayOnceNow: false,
      timerDuration: null,
      timerStartTimestamp: 0,
    };
    dispatch(setOneShotState({ oneShotTrackId, oneShotState: state }));
    return () => {
      // When this component is removed, delete the store entry
      dispatch(clearOneShotState({ oneShotTrackId }));
    };
  }, [dispatch, oneShotTrackId]);
  // Need to add useTrackMetadata to fetch the samples so we can start loading
  //  the audio.
  useTrackMetadata(oneShot, groupIndex);
  useOneShotPlayer(
    oneShotTrackId,
    samples,
    volume,
    minSecondsBetween,
    maxSecondsBetween,
    isPlaying
  );

  // No need to create DOM elements
  return null;
}
