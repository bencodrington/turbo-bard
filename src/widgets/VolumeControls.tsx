import React from "react";
import DefaultButton from "./buttons/DefaultButton";
import volumeIcon from "../assets/icon-volume.svg";
import muteIcon from "../assets/icon-mute.svg";
import RangeInput from "./RangeInput";

import "./VolumeControls.scss";

type VolumeControlsProps = {
  initialVolume: number,
  setVolume: (newValue: number) => void,
  isMuted: boolean,
  toggleIsMuted: () => void
};

export default function VolumeControls({
  initialVolume,
  setVolume,
  isMuted,
  toggleIsMuted
}: VolumeControlsProps) {
  return (
    <div className="volume-controls-container">
      <RangeInput
        className="range-slider"
        min={0}
        max={1}
        initialValue={initialVolume}
        onValueChange={setVolume}
        isVertical={true}
      />
      <DefaultButton
        onClick={toggleIsMuted}
        icon={isMuted ? muteIcon : volumeIcon}
      />
    </div>
  );
}