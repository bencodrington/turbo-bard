import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useOneShotPlayer from "../../hooks/useOneShotPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";
import { setTrackVolume } from "../../slices/groups";
import { createSourceSet } from "../../utils/audioFileUtil";

import TrackItem from "./TrackItem";

import "./OneShotTrackItem.scss";

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
  const dispatch = useDispatch();
  const sourceSets = isUnloaded(oneShot) ? [] : oneShot.samples.map(createSourceSet);
  const onVolumeChanged = useCallback((newVolume: number) => {
    dispatch(setTrackVolume({
      groupIndex,
      trackIndex: oneShot.index,
      volume: newVolume
    }));
  }, [dispatch, groupIndex, oneShot.index]);
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({ initialVolume: oneShot.volume, onVolumeChanged });
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

  const additionalControls = <div className="one-shot-range">
    play{isPlaying ? 'ing' : ''} every
    <span className="number"> {minSecondsBetween} </span>
    to
    <span className="number"> {maxSecondsBetween} </span>
    seconds
  </div>

  if (!isVisible) {
    return null;
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
      additionalControls={additionalControls}
      className="one-shot-track-item-container"
      groupIndex={groupIndex}
      trackIndex={oneShot.index}
    />
  );
}