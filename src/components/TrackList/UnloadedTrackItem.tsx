import React from "react";
import useTrackMetadata from "../../hooks/useTrackMetadata";
import { UnloadedTrack } from "../../models/Track";
import { ERROR_TYPE } from "../../models/DatabaseTypes";
import TrackItem from "./TrackItem";
import { useVolume } from "../../hooks/useVolume";

// import "./UnloadedTrackItem.scss";

type UnloadedTrackItemProps = {
  groupIndex: number,
  unloadedTrack: UnloadedTrack,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  isVisible: boolean
};

export default function UnloadedTrackItem({
  unloadedTrack,
  groupIndex,
  isSearchOpen,
  onTagClick,
  isVisible
}: UnloadedTrackItemProps) {
  const {
    id,
    index,
    type,
    name = '...',
    isPlaying
  } = unloadedTrack;
  useTrackMetadata(unloadedTrack, groupIndex);
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({
    initialVolume: unloadedTrack.volume,
    isInitiallyMuted: unloadedTrack.isMuted,
    groupIndex,
    trackIndex: index
  });
  if (!isVisible) return null;
  if (type === ERROR_TYPE) {
    return (
      <p>Failed to load track.</p>
    );
  }
  return <TrackItem
    groupIndex={groupIndex}
    isAudioReady={false}
    isMuted={isMuted}
    isPlaying={isPlaying}
    isSearchOpen={isSearchOpen}
    onTagClick={onTagClick}
    setVolume={setVolume}
    toggleIsMuted={toggleIsMuted}
    // Empty function since unloaded tracks will always
    //  have a disabled play button
    toggleIsPlaying={() => { }}
    trackIndex={index}
    volume={volume}
    name={name}
  />
}