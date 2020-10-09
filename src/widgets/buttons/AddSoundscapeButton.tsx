import React from "react";

import "./AddSoundscapeButton.scss";

type AddSoundscapeButtonProps = {
  onClick: () => void
};

export default function AddSoundscapeButton({ onClick }: AddSoundscapeButtonProps) {
  return (
    <button
      className="add-soundscape-button-container"
      onClick={onClick}
    >
      <h2>ADD SOUNDSCAPE</h2>
    </button>
  );
}