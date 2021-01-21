import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";
import { setTrackVolume } from "../../slices/soundscapes";
import useLoopPlayer from "../../hooks/useLoopPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { createSourceSet } from "../../utils/audioFileUtil";

import TrackItem from "./TrackItem";
import { ObjectType } from "../../models/ObjectTypes";

type LoopTrackItemProps = {
  loop: Loop | UnloadedTrack,
  soundscapeIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  soundscapeVolume: number
};

export default function LoopTrackItem({
  soundscapeIndex,
  loop,
  isVisible,
  isSearchOpen,
  onTagClick,
  soundscapeVolume
}: LoopTrackItemProps) {
  const dispatch = useDispatch();
  const sourceSet = isUnloaded(loop) ? [] : createSourceSet(loop.fileName);
  const onVolumeChanged = useCallback((newVolume: number) => {
    dispatch(setTrackVolume({
      soundscapeIndex,
      trackIndex: loop.index,
      volume: newVolume
    }));
  }, [dispatch, soundscapeIndex, loop.index]);
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({
    initialVolume: loop.volume,
    onVolumeChanged
  });
  const { name, id, index, tags } = loop;
  const { isPlaying, toggleIsPlaying, isLoaded: isAudioLoaded } = useLoopPlayer(sourceSet, volume * soundscapeVolume);
  useTrackData(id, index, soundscapeIndex, !isUnloaded(loop));

  if (!isVisible) {
    return null;
  }
  return (
    <TrackItem
      isAudioReady={isAudioLoaded}
      isMuted={isMuted}
      isPlaying={isPlaying}
      isSearchOpen={isSearchOpen}
      toggleIsMuted={toggleIsMuted}
      toggleIsPlaying={toggleIsPlaying}
      name={name}
      tags={tags ?? []}
      type={ObjectType.LOOP}
      volume={volume}
      setVolume={setVolume}
      onTagClick={onTagClick}
    />
  );
}