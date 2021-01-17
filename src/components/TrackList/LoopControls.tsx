import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import VolumeControls from "../../widgets/VolumeControls";
import moreIcon from "../../assets/icon-more.svg";

import "./LoopControls.scss";

type LoopControlsProps = {
  isMuted: boolean,
  toggleIsMuted: () => void,
  displaySource: () => void,
  remove: () => void,
  volume: number,
  setVolume: (newVolume: number) => void
};

export default function LoopControls({
  isMuted,
  toggleIsMuted,
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