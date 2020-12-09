import React from "react";
import AddButton from "./AddButton";

type AddSoundscapeButtonProps = {
  onClick: () => void
};

export default function AddSoundscapeButton({ onClick }: AddSoundscapeButtonProps) {
  return (
    <AddButton
      onClick={onClick}
      text="Add Soundscape"
    />
  );
}