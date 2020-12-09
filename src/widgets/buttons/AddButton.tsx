import React from "react";

import "./AddButton.scss";

type AddButtonProps = {
  isTrackButton?: boolean,
  text: string,
  onClick: () => void
};

export default function AddButton({
  isTrackButton = false,
  onClick,
  text
}: AddButtonProps) {
  return (
    <button
      className={
        'add-button-container ' +
        (isTrackButton ? 'track-button' : '')
      }
      onClick={onClick}
    >
      <h2>{text}</h2>
    </button>
  );
}