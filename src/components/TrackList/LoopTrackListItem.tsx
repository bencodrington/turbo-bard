import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";
import { removeTrack, setTrackVolume } from "../../slices/soundscapes";
import useLoopPlayer from "../../hooks/useLoopPlayer";
import useBoolean from "../../hooks/useBoolean";
import useTrackData from "../../hooks/useTrackData";

import "./LoopTrackListItem.scss";

import TagList from "../TagList";
import LoopControls from "./LoopControls";

type LoopTrackListItemProps = {
  loop: Loop | UnloadedTrack,
  soundscapeIndex: number,
  isVisible: boolean,
  isSearchOpen: boolean,
  onTagClick: (tag: string) => void
};

// TODO: extract to util
function createSourceSet(fileSource: string) {
  return [
    `http://phanary.com/audio/converted/${fileSource}.webm`,
    `http://phanary.com/audio/converted/${fileSource}.mp3`
  ];
}

export default function LoopTrackListItem({
  soundscapeIndex,
  loop,
  isVisible,
  isSearchOpen,
  onTagClick
}: LoopTrackListItemProps) {
  const dispatch = useDispatch();
  const sourceSet = isUnloaded(loop) ? [] : createSourceSet(loop.fileSource);
  const [volume, setVolume] = useState(isUnloaded(loop) ? 0.7 : loop.volume); // TODO: extract constant
  useEffect(()  => {
    if (volume === (loop as Loop).volume) return;
    dispatch(setTrackVolume({
      soundscapeIndex,
      trackIndex: loop.index,
      volume: volume
    }));
  });
  const { name, id, index, tags } = loop;

  const [isMuted, , toggleIsMuted] = useBoolean(false);
  const { isPlaying, toggleIsPlaying, isLoaded: isAudioLoaded } = useLoopPlayer(sourceSet, volume);
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