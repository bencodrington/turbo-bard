import React from "react";
import useOneShotPlayer from "../../hooks/useOneShotPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";
import { createSourceSet } from "../../utils/audioFileUtil";
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
  const sourceSets = isUnloaded(oneShot) ? [] : oneShot.samples.map(createSourceSet);
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({
    initialVolume: oneShot.volume,
    groupIndex,
    trackIndex: oneShot.index
  });
  const { name, id, index, tags } = oneShot;
  const computedVolume = isMuted
    ? 0
    : volume * groupVolume;
  useTrackData(id, index, groupIndex, !isUnloaded(oneShot));

  const minSecondsBetween = (oneShot as OneShot).minSecondsBetween ?? DEFAULT_MIN_TIME_BETWEEN;
  const maxSecondsBetween = (oneShot as OneShot).maxSecondsBetween ?? DEFAULT_MAX_TIME_BETWEEN;

  const {
    isPlaying,
    toggleIsPlaying
  } = useOneShotPlayer(
    sourceSets,
    computedVolume,
    minSecondsBetween,
    maxSecondsBetween
  );

  if (!isVisible) {
    return null;
  }

  const range = (
    <OneShotRange
      isPlaying={isPlaying}
      minSecondsBetween={minSecondsBetween}
      maxSecondsBetween={maxSecondsBetween}
    />
  );

  const source = (oneShot as OneShot).source ?? null;

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
      additionalControls={range}
      groupIndex={groupIndex}
      trackIndex={oneShot.index}
      source={source}
    />
  );
}