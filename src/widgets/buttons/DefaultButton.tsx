import React from "react";

import "./DefaultButton.scss";

type DefaultButtonProps = {
  text: string,
  onClick: () => void
};

export default function DefaultButton({text, onClick}: DefaultButtonProps) {
  return (
    <button
      className="default-button-container"
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  )
};