import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useTrackData from "../../hooks/useTrackData";
import { useVolume } from "../../hooks/useVolume";
import { isUnloaded, OneShot, UnloadedTrack } from "../../models/Track";
import { removeTrack, setTrackVolume } from "../../slices/soundscapes";
import { createSourceSet } from "../../utils/audioFileUtil";
import TagList from "../TagList";
import OneShotControls from "./OneShotControls";

import "./OneShotTrackListItem.scss";

type OneShotTrackListItemProps = {
  oneShot: OneShot | UnloadedTrack,
  soundscapeIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void,
  soundscapeVolume: number
};


export default function OneShotTrackListItem({
  soundscapeIndex,
  oneShot,
  isVisible,
  isSearchOpen,
  onTagClick,
  soundscapeVolume
}: OneShotTrackListItemProps) {
  const dispatch = useDispatch();
  // TODO: use all samples
  const sourceSet = isUnloaded(oneShot) ? [] : createSourceSet(oneShot.samples[0]);
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
  function displaySource() {
    console.log('TODO');
  }
  function remove() {
    dispatch(removeTrack({ soundscapeIndex, trackIndex: index }))
  }
  return (
    <div className="one-shot-track-list-item-container">
      <h4>{name ?? null}</h4>
      {
        isSearchOpen && tags !== undefined
          ? <TagList tags={tags} onTagClick={onTagClick} />
          : null
      }
      {
        !isSearchOpen
          ? <OneShotControls
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