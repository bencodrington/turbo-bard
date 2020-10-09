import React from "react";
import DefaultButton from "./DefaultButton";

export default function NewSoundscapeButton() {

  function createNewSoundscape() {
    console.log('createNewSoundscape');
  }

  return (
    <DefaultButton
      text="Create New Soundscape"
      onClick={createNewSoundscape}
    />
  );
}