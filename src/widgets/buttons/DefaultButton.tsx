import React from "react";

type DefaultButtonProps = {
  text: string,
  onClick: () => void
};

export default function DefaultButton({text, onClick}: DefaultButtonProps) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
};