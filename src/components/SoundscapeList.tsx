import React from "react";
import AddSoundscapeButton from "../widgets/buttons/AddSoundscapeButton";
import SoundscapeSearchDropdown from "./SoundscapeSearchDropdown";

export default function SoundscapeList() {
  return (
    <div className="soundscape-list-container">
      <AddSoundscapeButton />
      <SoundscapeSearchDropdown />
    </div>
  );
};