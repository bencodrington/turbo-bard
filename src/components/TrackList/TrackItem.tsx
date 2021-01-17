import React from "react";
import FlameButton from "../../widgets/buttons/FlameButton";
import torchHandle from "../../assets/torch-handle.svg";

import "./TrackItem.scss";
import TagList from "../TagList";
import LoopControls from "./LoopControls";
import { ObjectType } from "../../models/ObjectTypes";

type TrackItemProps = {
  type: ObjectType
  isPlaying: boolean,
  toggleIsPlaying: () => void,
  isAudioLoaded: boolean,
  isSearchOpen: boolean,
  name?: string,
  isMuted: boolean,
  toggleIsMuted: () => void,
  volume: number,
  setVolume: (newVolume: number) => void,
  tags?: string[],
  onTagClick: (tag: string) => void
};

export default function TrackItem({
  isPlaying,
  toggleIsPlaying,
  isAudioLoaded,
  isSearchOpen,
  name,
  isMuted,
  toggleIsMuted,
  volume,
  setVolume,
  tags,
  onTagClick,
  type
}: TrackItemProps) {

  // TODO: expanded loop options
  // function remove() {
  //   dispatch(removeTrack({ soundscapeIndex, trackIndex: index }))
  // }

  const className = 'track-item-container' +
    (type === ObjectType.ONESHOT ? ' track-item-container--one-shot' : '');

  return (
    <div className={className}>
      <div className="torch">
        <FlameButton
          onClick={toggleIsPlaying}
          isPlaying={isPlaying}
          isDisabled={!isAudioLoaded}
        />
        <div className="torch__handle">
          <img src={torchHandle} alt="Torch handle" />
        </div>
      </div>
      <div className="track__body">
        <div className="track__name">
          <h4>{name ?? '...'}</h4>
        </div>
        {
          isSearchOpen && tags !== undefined
            ? <TagList tags={tags} onTagClick={onTagClick} />
            : null
        }
        {
          !isSearchOpen
            ? <LoopControls
              isMuted={isMuted}
              toggleIsMuted={toggleIsMuted}
              volume={volume}
              setVolume={setVolume}
            />
            : null
        }
      </div>
    </div>
  );
}