import React from "react";
import FlameButton from "../../widgets/buttons/FlameButton";
import torchHandle from "../../assets/torch-handle.svg";
import moreIcon from "../../assets/icon-more.svg";

import "./TrackItem.scss";
import TagList from "../TagList";
import VolumeControls from "../../widgets/VolumeControls";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import useBoolean from "../../hooks/useBoolean";
import ExpandedTrackItem from "./ExpandedTrackItem";

type TrackItemProps = {
  isPlaying: boolean,
  toggleIsPlaying: () => void,
  isAudioReady: boolean,
  isSearchOpen: boolean,
  name?: string,
  isMuted: boolean,
  toggleIsMuted: () => void,
  volume: number,
  setVolume: (newVolume: number) => void,
  tags?: string[],
  onTagClick: (tag: string) => void,
  additionalControls?: JSX.Element,
  additionalExpandedControls?: JSX.Element,
  groupIndex: number,
  trackIndex: number,
  source?: {
    author?: string,
    urls: string[]
  }
};

export default function TrackItem({
  isPlaying,
  toggleIsPlaying,
  isAudioReady,
  isSearchOpen,
  name,
  isMuted,
  toggleIsMuted,
  volume,
  setVolume,
  tags,
  onTagClick,
  additionalControls,
  additionalExpandedControls,
  groupIndex,
  trackIndex,
  source
}: TrackItemProps) {

  const [isExpanded, , toggleIsExpanded] = useBoolean(false);

  if (isExpanded) {
    return <ExpandedTrackItem
      name={name}
      source={source}
      groupIndex={groupIndex}
      trackIndex={trackIndex}
      toggleIsExpanded={toggleIsExpanded}
      additionalExpandedControls={additionalExpandedControls}
    />
  }

  return (
    <div className="track-item-container">
      {
        isSearchOpen
          ? null
          : <div className="torch">
            <FlameButton
              onClick={toggleIsPlaying}
              isPlaying={isPlaying}
              isDisabled={!isAudioReady}
            />
            <div className="torch__handle">
              <img src={torchHandle} alt="Torch handle" />
            </div>
          </div>
      }
      <div className="track__body">
        <div className="track__name">
          <h4>{name ?? '...'}</h4>
        </div>
        {(isSearchOpen) ? null : additionalControls}
        {
          isSearchOpen && tags !== undefined
            ? <TagList tags={tags} onTagClick={onTagClick} />
            : null
        }
        {
          !isSearchOpen
            ? <div className='track-controls'>
              <VolumeControls
                volume={volume}
                isMuted={isMuted}
                setVolume={setVolume}
                toggleIsMuted={toggleIsMuted}
              />
              <DefaultButton
                onClick={toggleIsExpanded}
                icon={moreIcon}
                isRound={true}
                isActive={false}
              />
            </div>
            : null
        }
      </div>
    </div>
  );
}