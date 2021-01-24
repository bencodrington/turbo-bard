import React from "react";
import FlameButton from "../../widgets/buttons/FlameButton";
import torchHandle from "../../assets/torch-handle.svg";
import moreIcon from "../../assets/icon-more.svg";

import "./TrackItem.scss";
import TagList from "../TagList";
import VolumeControls from "../../widgets/VolumeControls";
import DefaultButton from "../../widgets/buttons/DefaultButton";

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
  className?: string
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
  className
}: TrackItemProps) {

  // TODO: expanded loop options
  // function remove() {
  //   dispatch(removeTrack({ groupIndex, trackIndex: index }))
  // }

  return (
    <div className={'track-item-container ' + (className ?? '')}>
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
        {additionalControls}
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
                onClick={() => { console.log('show more options') }}
                icon={moreIcon}
                isRound={true}
              />
            </div>
            : null
        }
      </div>
    </div>
  );
}