import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import VolumeControls from "../../widgets/VolumeControls";
import moreIcon from "../../assets/icon-more.svg";

import "./LoopControls.scss";

type LoopControlsProps = {
  isMuted: boolean,
  isPlaying: boolean,
  isAudioLoaded: boolean,
  toggleIsMuted: () => void,
  toggleIsPlaying: () => void,
  displaySource: () => void,
  remove: () => void,
  volume: number,
  setVolume: (newVolume: number) => void
};

export default function LoopControls({
  isMuted,
  isPlaying,
  isAudioLoaded,
  toggleIsMuted,
  toggleIsPlaying,
  volume,
  setVolume,
  remove,
  displaySource
}: LoopControlsProps) {
  return (
    <div className='loop-controls-container'>
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
      {/* <DefaultButton
        className='play-toggle-button'
        onClick={toggleIsPlaying}
        icon={isPlaying ? stopIcon : playIcon}
        isDisabled={!isAudioLoaded}
      /> */}

      {/* <DefaultButton
        onClick={remove}
        icon={closeIcon}
      />
      <DefaultButton
        onClick={displaySource}
        icon={infoIcon}
      /> */}
    </div>
  );
}