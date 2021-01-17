import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { ObjectType } from "../../models/ObjectTypes";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";
import { setTrackVolume } from "../../slices/soundscapes";
import { createSourceSet } from "../../utils/audioFileUtil";

import TrackItem from "./TrackItem";

type OneShotTrackItemProps = {
  oneShot: OneShot | UnloadedTrack,
  soundscapeIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  soundscapeVolume: number
};

export default function OneShotTrackItem({
  soundscapeIndex,
  oneShot,
  isVisible,
  isSearchOpen,
  onTagClick,
  soundscapeVolume
}: OneShotTrackItemProps) {
  const dispatch = useDispatch();
  // TODO: use all samples
  const sourceSet = isUnloaded(oneShot) ? [] : createSourceSet(oneShot.samples[0]);
  console.log(sourceSet);
  const onVolumeChanged = useCallback((newVolume: number) => {
    dispatch(setTrackVolume({
      soundscapeIndex,
      trackIndex: oneShot.index,
      volume: newVolume
    }));
  }, [dispatch, soundscapeIndex, oneShot.index]);
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
  // const { isPlaying, toggleIsPlaying, isLoaded: isAudioLoaded } = useLoopPlayer(sourceSet, volume * soundscapeVolume);
  const isPlaying = false;
  const toggleIsPlaying = () => { console.log('toggle isPlaying'); }
  const isAudioLoaded = true;
  useTrackData(id, index, soundscapeIndex, !isUnloaded(oneShot));

  if (!isVisible) {
    return null;
  }
  return (
    <TrackItem
      isAudioLoaded={isAudioLoaded}
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