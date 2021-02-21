import React from "react";
import FlameButton from "../../widgets/buttons/FlameButton";
import torchHandle from "../../assets/torch-handle.svg";
import infoIcon from "../../assets/icon-info.svg";
import closeIcon from "../../assets/icon-close.svg";

import "./TrackItem.scss";
import TagList from "../TagList";
import VolumeControls from "../../widgets/VolumeControls";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import useBoolean from "../../hooks/useBoolean";
import { useDispatch } from "react-redux";
import { removeTrack } from "../../slices/groups";
import TrackSource from "./TrackSource";

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
  groupIndex,
  trackIndex,
  source
}: TrackItemProps) {

  const [isExpanded, , toggleIsExpanded] = useBoolean(false);

  const dispatch = useDispatch();
  function remove() {
    dispatch(removeTrack({ groupIndex, trackIndex }))
  }

  return (
    <div className="track-item-container">
      <div className="torch">
        <FlameButton
          onClick={toggleIsPlaying}
          isPlaying={isPlaying}
          isDisabled={!isAudioReady}
        />
        <div className="torch__handle">
          <img src={torchHandle} alt="Torch handle" />
        </div>
      </div>
      <div className="track__body">
        <div className="track__name">
          <h4 className={isExpanded ? 'expanded' : ''}>
            {name ?? '...'}
          </h4>
          {additionalControls}
          <DefaultButton
            onClick={remove}
            icon={closeIcon}
            isDisabled={isSearchOpen}
          />
        </div>
        {
          isSearchOpen
            ? tags !== undefined
              ? <TagList tags={tags} onTagClick={onTagClick} />
              : null
            : <div className='track-controls'>
              <VolumeControls
                volume={volume}
                isMuted={isMuted}
                setVolume={setVolume}
                toggleIsMuted={toggleIsMuted}
              />
              <DefaultButton
                onClick={toggleIsExpanded}
                icon={infoIcon}
                isActive={isExpanded}
                isRound={true}
              />
            </div>
        }
        {
          isExpanded
            ? <TrackSource source={source} />
            : null
        }
      </div>
    </div>
  );
}