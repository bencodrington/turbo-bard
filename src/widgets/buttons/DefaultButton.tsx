import React from "react";

import "./DefaultButton.scss";

type DefaultButtonProps = {
  text: string,
  onClick: () => void,
  className?: string
};

export default function DefaultButton({ text, onClick, className }: DefaultButtonProps) {

  return (
    <button
      className={'default-button-container ' + className ?? ''}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  )
};