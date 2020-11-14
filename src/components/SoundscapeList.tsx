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

  function cloneSoundscape(name: string, sourceId: string) {
    addSoundscape({
      id: soundscapes.length.toString(),
      name,
      tracks: [],
      cloneFrom: sourceId
    });
  }

  function newSoundscape(name: string) {
    addSoundscape({
      id: soundscapes.length.toString(),
      name,
      tracks: []
    });
  }

  const soundscapeListItems = soundscapes.map(
    soundscape => (
      <SoundscapeListItem
        name={soundscape.name}
        cloneFrom={soundscape.cloneFrom}
        key={soundscape.id}
      />
    )
  );

  return (
    <div className="soundscape-list-container">
      {soundscapeListItems}
      <AddSoundscapeButton onClick={toggleIsSearchOpen} />
      {isSearchOpen
        ? <SoundscapeSearchDropdown
          newSoundscape={newSoundscape}
          cloneSoundscape={cloneSoundscape}
          nextId={soundscapes.length.toString()}
        />
        : null
      }
    </div>
  );
};