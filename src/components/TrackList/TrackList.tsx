import React from "react";
import useBoolean from "../../hooks/useBoolean";
import { Soundscape } from "../../models/Soundscape";
import { isLoop, isOneShot, Track } from "../../models/Track";
import { useSoundscapes } from "../../slices";
import AddTrackButton from "../../widgets/buttons/AddTrackButton";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import LoopTrackListItem from "./LoopTrackListItem";
import TrackListHeader from "./TrackListHeader";

function listItemFromTrack(track: Track, soundscape: Soundscape) {
  if (isLoop(track)) {
    return <LoopTrackListItem
      key={soundscape.id + '-' + track.index}
      soundscapeIndex={soundscape.id}
      loop={track}
      isVisible={soundscape.isOpen}
    />
  } else if (isOneShot(track)) {
    // TODO:
    return null;
  } else {
    return null;
  }
}

export default function TrackList() {
  const soundscapes = useSoundscapes();
  const [
    isSearchOpen,
    setIsSearchOpen,
    toggleIsSearchOpen
  ] = useBoolean(false);
  return (
    <div className="track-list-container">
      <TrackListHeader />
      <AddTrackButton onClick={toggleIsSearchOpen} />
      {isSearchOpen
        ? <TrackSearchDropdown
          closeSearchDropdown={() => { setIsSearchOpen(false) }}
        />
        : null
      }
      {soundscapes.map(soundscape =>
        soundscape.tracks.map(track =>
          listItemFromTrack(track, soundscape)
        )
      )}
    </div>
  );
}