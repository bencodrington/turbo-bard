import React from "react";
import AddSoundscapeButton from "../../widgets/buttons/AddSoundscapeButton";
import SoundscapeListItem from "./SoundscapeListItem";
import SoundscapeSearchDropdown from "../SearchDropdown/SoundscapeSearchDropdown";
import "./SoundscapeList.scss";
import { useOpenSoundscape, useSoundscapes } from "../../slices";
import useBoolean from "../../hooks/useBoolean";

export default function SoundscapeList() {
  const soundscapes = useSoundscapes();
  const isSoundscapeOpen = useOpenSoundscape() !== undefined;
  const [
    isSearchOpen,
    setIsSearchOpen,
    toggleIsSearchOpen
  ] = useBoolean(false);

  const soundscapeListItems = soundscapes.map(
    soundscape => (
      <SoundscapeListItem
        key={soundscape.id}
        soundscape={soundscape}
      />
    )
  );

  let className = 'soundscape-list-container';
  className += isSoundscapeOpen ? ' hidden--mobile' : '';

  return (
    <div className={className}>
      {soundscapeListItems}
      <AddSoundscapeButton onClick={toggleIsSearchOpen} />
      {isSearchOpen
        ? <SoundscapeSearchDropdown
          closeSearchDropdown={() => { setIsSearchOpen(false) }}
        />
        : null
      }
    </div>
  );
};