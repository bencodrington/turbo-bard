import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import VolumeControls from "../../widgets/VolumeControls";
import closeIcon from "../../assets/icon-close.svg";
import infoIcon from "../../assets/icon-info.svg";
import loopIcon from "../../assets/icon-loop.svg";
import playIcon from "../../assets/icon-play.svg";
import stopIcon from "../../assets/icon-stop.svg";

import "./LoopControls.scss";

type LoopControlsProps = {
  isMuted: boolean,
  isPlaying: boolean,
  isAudioLoaded: boolean,
  toggleIsMuted: () => void,
  toggleIsPlaying: () => void,
  displaySource: () => void,
  remove: () => void,
  setVolume: (newVolume: number) => void
};

export default function LoopControls({
  isMuted,
  isPlaying,
  isAudioLoaded,
  toggleIsMuted,
  toggleIsPlaying,
  setVolume,
  remove,
  displaySource
}: LoopControlsProps) {
  return (
    <div className='loop-controls-container'>
      <VolumeControls
        initialVolume={0.7} // TODO: extract constant
        isMuted={isMuted}
        setVolume={setVolume}
        toggleIsMuted={toggleIsMuted}
      />

      <div className='center-cell'>
        <DefaultButton
          className='play-toggle-button'
          onClick={toggleIsPlaying}
          icon={isPlaying ? stopIcon : playIcon}
          isDisabled={!isAudioLoaded}
        />
        <img className='loop-icon' src={loopIcon} alt='' />
      </div>

      <div className='standard-track-controls'>
        <DefaultButton
          onClick={remove}
          icon={closeIcon}
        />
        <DefaultButton
          onClick={displaySource}
          icon={infoIcon}
        />
      </div>
    </div>
  );
}