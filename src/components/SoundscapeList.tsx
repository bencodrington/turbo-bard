import React, { useState } from "react";
import AddSoundscapeButton from "../widgets/buttons/AddSoundscapeButton";
import SoundscapeListItem from "./SoundscapeListItem";
import SoundscapeSearchDropdown from "./SearchDropdown/SoundscapeSearchDropdown";
import "./SoundscapeList.scss";
import { useSoundscapes } from "../slices";

export default function SoundscapeList() {
  const soundscapes = useSoundscapes();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function toggleIsSearchOpen() {
    setIsSearchOpen(!isSearchOpen);
  }

  const soundscapeListItems = soundscapes.map(
    soundscape => (
      <SoundscapeListItem
        name={soundscape.name}
        cloneFrom={soundscape.sourceId}
        key={soundscape.id}
      />
    )
  );

  return (
    <div className="soundscape-list-container">
      {soundscapeListItems}
      <AddSoundscapeButton onClick={toggleIsSearchOpen} />
      {isSearchOpen
        ? <SoundscapeSearchDropdown />
        : null
      }
    </div>
  );
};