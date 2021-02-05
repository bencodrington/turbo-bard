import React from "react";
import DefaultButton from "./buttons/DefaultButton";
import volumeIcon from "../assets/icon-volume.svg";
import muteIcon from "../assets/icon-mute.svg";
import RangeInput from "./RangeInput";

import "./VolumeControls.scss";
import { isNumberArray } from "../utils/typeUtil";

type VolumeControlsProps = {
  volume: number,
  setVolume: (newValue: number) => void,
  isMuted: boolean,
  toggleIsMuted: () => void
};

export default function VolumeControls({
  volume,
  setVolume,
  isMuted,
  toggleIsMuted
}: VolumeControlsProps) {

  const ariaValueFormatter = (value: number) => {
    return `${value * 100}%`;
  }

  function _setVolume(volume: number | number[]) {
    // Coerce value to type number, since RangeInput
    //  can have multiple handles
    if (isNumberArray(volume)) return;
    return setVolume(volume);
  }

  return (
    <div className="volume-controls-container">
      <RangeInput
        className="range-slider"
        min={0}
        max={1}
        value={volume}
        onValueChange={_setVolume}
        ariaLabel="volume slider"
        getAriaValueText={ariaValueFormatter}
      />
      <DefaultButton
        onClick={toggleIsMuted}
        icon={isMuted ? muteIcon : volumeIcon}
        isActive={isMuted}
      />
    </div>
  );
}