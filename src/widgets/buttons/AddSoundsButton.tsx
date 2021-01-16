import React from "react";
import DefaultButton from "./DefaultButton";
import addIcon from "../../assets/icon-add.svg";

import "./AddSoundsButton.scss";

type AddSoundsButtonProps = {
  onClick: () => void
};

export default function AddSoundsButton({ onClick
}: AddSoundsButtonProps) {
  return (
    <DefaultButton
      className='add-sounds-button-container'
      onClick={onClick}
      icon={addIcon}
      text='Add sounds'
    />
  );
}