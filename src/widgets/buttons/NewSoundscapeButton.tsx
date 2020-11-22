import React from "react";
import DefaultButton from "./DefaultButton";

import './NewSoundscapeButton.scss';

type NewSoundscapeButtonProps = {
  onClick: () => void
};

export default function NewSoundscapeButton({onClick}: NewSoundscapeButtonProps) {

  return (
    <DefaultButton
      text="Create new soundscape"
      onClick={onClick}
      className="new-soundscape-button-container"
    />
  );
}