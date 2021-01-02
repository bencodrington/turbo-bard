import React from "react";
import DefaultButton from "./DefaultButton";

import './NewSoundscapeButton.scss';

type NewSoundscapeButtonProps = {
  onClick: () => void,
  searchText?: string
};

export default function NewSoundscapeButton({ onClick, searchText }: NewSoundscapeButtonProps) {
  const trimmed = searchText?.trim();
  const buttonText = trimmed && trimmed.length > 0
    ? `Create '${trimmed}'`
    : 'Create your own';

  return (
    <DefaultButton
      text={buttonText}
      onClick={onClick}
      className="new-soundscape-button-container"
    />
  );
}