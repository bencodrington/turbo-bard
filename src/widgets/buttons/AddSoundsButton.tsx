import React from "react";

import "./AddSoundsButton.scss";
import DefaultButton from "./DefaultButton";

type AddSoundsButtonProps = {
  onClick: () => void
};

export default function AddSoundsButton({ onClick
}: AddSoundsButtonProps) {
  return (
    <DefaultButton
      className='add-sounds-button-container'
      onClick={onClick}
      text='+ Add sounds'
    />
  );
}