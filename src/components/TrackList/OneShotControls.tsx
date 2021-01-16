import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import VolumeControls from "../../widgets/VolumeControls";
import closeIcon from "../../assets/icon-close.svg";
import infoIcon from "../../assets/icon-info.svg";
import oneShotIcon from "../../assets/icon-one-shot.svg";
import playIcon from "../../assets/icon-play.svg";
import stopIcon from "../../assets/icon-stop.svg";

import "./OneShotControls.scss";

type OneShotControlsProps = {
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

export default function OneShotControls({
  isMuted,
  isPlaying,
  isAudioLoaded,
  toggleIsMuted,
  toggleIsPlaying,
  volume,
  setVolume,
  remove,
  displaySource
}: OneShotControlsProps) {
  return (
    <div className='one-shot-controls-container'>
      <VolumeControls
        volume={volume}
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
        <img className='one-shot-icon' src={oneShotIcon} alt='' />
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