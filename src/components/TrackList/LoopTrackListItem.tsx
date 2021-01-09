import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";
import { removeTrack, setTrackVolume } from "../../slices/soundscapes";
import useLoopPlayer from "../../hooks/useLoopPlayer";
import useTrackData from "../../hooks/useTrackData";

import "./LoopTrackListItem.scss";

import TagList from "../TagList";
import LoopControls from "./LoopControls";
import { useVolume } from "../../hooks/useVolume";
import { createSourceSet } from "../../utils/audioFileUtil";

type LoopTrackListItemProps = {
  loop: Loop | UnloadedTrack,
  soundscapeIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  soundscapeVolume: number
};

export default function LoopTrackListItem({
  soundscapeIndex,
  loop,
  isVisible,
  isSearchOpen,
  onTagClick,
  soundscapeVolume
}: LoopTrackListItemProps) {
  const dispatch = useDispatch();
  const sourceSet = isUnloaded(loop) ? [] : createSourceSet(loop.fileSource);
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
  function displaySource() {
    console.log('TODO');
  }
  function remove() {
    dispatch(removeTrack({ soundscapeIndex, trackIndex: index }))
  }
  return (
    <div className="loop-track-list-item-container">
      <h4>{name ?? null}</h4>
      {
        isSearchOpen && tags !== undefined
          ? <TagList tags={tags} onTagClick={onTagClick} />
          : null
      }
      {
        !isSearchOpen
          ? <LoopControls
            displaySource={displaySource}
            isMuted={isMuted}
            toggleIsMuted={toggleIsMuted}
            isPlaying={isPlaying}
            toggleIsPlaying={toggleIsPlaying}
            isAudioLoaded={isAudioLoaded}
            volume={volume}
            setVolume={setVolume}
            remove={remove}
          />
          : null
      }
    </div>
  );
}