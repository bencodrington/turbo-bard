import React from "react";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";
import useLoopPlayer from "../../hooks/useLoopPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { createSourceSet } from "../../utils/audioFileUtil";

import TrackItem from "./TrackItem";

type LoopTrackItemProps = {
  loop: Loop | UnloadedTrack,
  groupIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  groupVolume: number
};

export default function LoopTrackItem({
  groupIndex,
  loop,
  isVisible,
  isSearchOpen,
  onTagClick,
  groupVolume
}: LoopTrackItemProps) {
  const sourceSet = isUnloaded(loop) ? [] : createSourceSet(loop.fileName);
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({
    initialVolume: loop.volume,
    groupIndex,
    trackIndex: loop.index
  });
  const { name, id, index, tags } = loop;
  const computedVolume = isMuted
    ? 0
    : volume * groupVolume;
  const { isPlaying, toggleIsPlaying, isLoaded: isAudioLoaded } = useLoopPlayer(sourceSet, computedVolume);
  useTrackData(id, index, groupIndex, !isUnloaded(loop));

  if (!isVisible) {
    return null;
  }

  const source = (loop as Loop).source ?? null;
  
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
      volume={volume}
      setVolume={setVolume}
      onTagClick={onTagClick}
      groupIndex={groupIndex}
      trackIndex={loop.index}
      source={source}
    />
  );
}