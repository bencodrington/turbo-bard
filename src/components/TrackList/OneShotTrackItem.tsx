import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useOneShotPlayer from "../../hooks/useOneShotPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";
import { setTrackIsPlaying } from "../../slices/groups";
import OneShotRange from "./OneShotRange";

import TrackItem from "./TrackItem";

type OneShotTrackItemProps = {
  oneShot: OneShot | UnloadedTrack,
  groupIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  groupVolume: number
};

const DEFAULT_MIN_TIME_BETWEEN = 5;
const DEFAULT_MAX_TIME_BETWEEN = 10;

export default function OneShotTrackItem({
  groupIndex,
  oneShot,
  isVisible,
  isSearchOpen,
  onTagClick,
  groupVolume
}: OneShotTrackItemProps) {
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({
    initialVolume: oneShot.volume,
    isInitiallyMuted: oneShot.isMuted,
    groupIndex,
    trackIndex: oneShot.index
  });
  const { name, id, index, tags, isPlaying } = oneShot;
  const computedVolume = isMuted
  ? 0
  : volume * groupVolume;
  useTrackData(id, index, groupIndex, !isUnloaded(oneShot));
  const dispatch = useDispatch();
  const wickRef = useRef(null);
  
  const samples = isUnloaded(oneShot) ? [] : oneShot.samples;
  const minSecondsBetween = (oneShot as OneShot).minSecondsBetween ?? DEFAULT_MIN_TIME_BETWEEN;
  const maxSecondsBetween = (oneShot as OneShot).maxSecondsBetween ?? DEFAULT_MAX_TIME_BETWEEN;
  const { playNow } = useOneShotPlayer(
    samples,
    computedVolume,
    minSecondsBetween,
    maxSecondsBetween,
    isPlaying,
    wickRef
  );

  if (!isVisible) {
    return null;
  }

  const configurableRange = (
    <OneShotRange
      isPlaying={isPlaying}
      minSecondsBetween={minSecondsBetween}
      maxSecondsBetween={maxSecondsBetween}
      wickRef={wickRef}
    />
  )

  const source = (oneShot as OneShot).source ?? null;

  function toggleIsPlaying() {
    const newIsPlayingValue = !isPlaying;
    // When play button is clicked, play sound before resetting one-shot wick.
    //  This can't happen within the hook whenever isPlaying is set to true,
    //  because we don't want to trigger the sound when a group's "play all"
    //  button is clicked.
    if (newIsPlayingValue === true) {
      playNow();
    }
    dispatch(setTrackIsPlaying({
      groupIndex,
      trackIndex: oneShot.index,
      isPlaying: newIsPlayingValue
    }));
  }

  return (
    <TrackItem
      isAudioReady={true}
      isMuted={isMuted}
      isPlaying={isPlaying}
      isSearchOpen={isSearchOpen}
      toggleIsMuted={toggleIsMuted}
      toggleIsPlaying={toggleIsPlaying}
      name={name}
      tags={tags ?? []}
      volume={volume}
      setVolume={setVolume}
      onTagClick={onTagClick}
      additionalControls={configurableRange}
      groupIndex={groupIndex}
      trackIndex={oneShot.index}
      source={source}
    />
  );
}