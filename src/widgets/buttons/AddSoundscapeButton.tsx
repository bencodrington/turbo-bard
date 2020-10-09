import React from "react";

type AddSoundscapeButtonProps = {
  onClick: () => void
};

export default function AddSoundscapeButton({ onClick }: AddSoundscapeButtonProps) {
  return (
    <button
      className="add-soundscape-button-container"
      onClick={onClick}
    >
      Add Soundscape
    </button>
  );
}