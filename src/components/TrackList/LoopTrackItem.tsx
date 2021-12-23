import React from "react";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";
import useLoopPlayer from "../../hooks/useLoopPlayer";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";

import TrackItem from "./TrackItem";
import { useDispatch } from "react-redux";
import { setTrackIsPlaying } from "../../slices/groups";

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
  const { name, id, index, tags, isPlaying } = loop;
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({
    initialVolume: loop.volume,
    isInitiallyMuted: loop.isMuted,
    groupIndex,
    trackIndex: index
  });
  const computedVolume = isMuted
    ? 0
    : volume * groupVolume;
  const fileName = isUnloaded(loop) ? undefined : loop.fileName;
  const { isLoaded: isAudioLoaded } = useLoopPlayer(computedVolume, isPlaying, loop.shouldLoad, fileName);
  useTrackData(id, index, groupIndex, !isUnloaded(loop));
  const dispatch = useDispatch();

  if (!isVisible) {
    return null;
  }

  const source = (loop as Loop).source ?? null;
  function toggleIsPlaying() {
    dispatch(setTrackIsPlaying({
      groupIndex,
      trackIndex: index,
      isPlaying: !loop.isPlaying
    }));
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
      volume={volume}
      setVolume={setVolume}
      onTagClick={onTagClick}
      groupIndex={groupIndex}
      trackIndex={loop.index}
      source={source}
    />
  );
}