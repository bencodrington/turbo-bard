import React, { useState } from "react";
import AddSoundscapeButton from "../widgets/buttons/AddSoundscapeButton";
import SoundscapeSearchDropdown from "./SoundscapeSearchDropdown";

export default function SoundscapeList() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function toggleIsSearchOpen() {
    setIsSearchOpen(!isSearchOpen);
  }
  return (
    <div className="soundscape-list-container">
      <AddSoundscapeButton onClick={toggleIsSearchOpen} />
      {isSearchOpen ? <SoundscapeSearchDropdown /> : null}
    </div>
  );
};