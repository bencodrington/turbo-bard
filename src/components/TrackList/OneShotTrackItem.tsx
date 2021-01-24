import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useOneShotPlayer from "../../hooks/useOneShotPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { ObjectType } from "../../models/ObjectTypes";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";
import { setTrackVolume } from "../../slices/groups";
import { createSourceSet } from "../../utils/audioFileUtil";

import TrackItem from "./TrackItem";

type OneShotTrackItemProps = {
  oneShot: OneShot | UnloadedTrack,
  groupIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  groupVolume: number
};

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
  } = useVolume({
    initialVolume: oneShot.volume,
    onVolumeChanged
  });
  const { name, id, index, tags } = oneShot;
  const computedVolume = isMuted
    ? 0
    : volume * groupVolume;
  const {
    isPlaying,
    toggleIsPlaying
  } = useOneShotPlayer(sourceSets, computedVolume);
  useTrackData(id, index, groupIndex, !isUnloaded(oneShot));

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
      type={ObjectType.ONESHOT}
      volume={volume}
      setVolume={setVolume}
      onTagClick={onTagClick}
    />
  );
}