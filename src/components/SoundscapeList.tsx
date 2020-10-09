import React, { useState } from "react";
import { Soundscape } from "../models/Soundscape";
import AddSoundscapeButton from "../widgets/buttons/AddSoundscapeButton";
import SoundscapeListItem from "./SoundscapeListItem";
import SoundscapeSearchDropdown from "./SearchDropdown/SoundscapeSearchDropdown";
import "./SoundscapeList.scss";

type SoundscapeListProps = {
  soundscapes: Soundscape[],
  addSoundscape: (newSoundscape: Soundscape) => void
};

export default function SoundscapeList({
  soundscapes,
  addSoundscape
}: SoundscapeListProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function toggleIsSearchOpen() {
    setIsSearchOpen(!isSearchOpen);
  }

  const soundscapeListItems = soundscapes.map(
    (soundscape, index) => (
      <SoundscapeListItem
        data={soundscape}
        key={index} //TODO: key should be a unique ID
      />
    )
  );

  return (
    <div className="soundscape-list-container">
      {soundscapeListItems}
      <AddSoundscapeButton onClick={toggleIsSearchOpen} />
      {isSearchOpen
        ? <SoundscapeSearchDropdown
          addSoundscape={addSoundscape}
          nextId={soundscapes.length.toString()}
        />
        : null
      }
    </div>
  );
};