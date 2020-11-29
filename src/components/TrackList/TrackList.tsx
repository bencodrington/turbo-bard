import React from "react";
import useBoolean from "../../hooks/useBoolean";
import { Soundscape } from "../../models/Soundscape";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop, Track } from "../../models/Track";
import { useSoundscapes } from "../../slices";
import AddTrackButton from "../../widgets/buttons/AddTrackButton";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import LoopTrackListItem from "./LoopTrackListItem";
import TrackListHeader from "./TrackListHeader";
import UnloadedTrackListItem from "./UnloadedTrackListItem";

function constructKey(track: Track, soundscape: Soundscape) {
  return soundscape.index + '-' + track.index;
}

function listItemFromTrack(track: Track, soundscape: Soundscape) {
  if (isLoop(track) || isUnloadedLoop(track)) {
    return <LoopTrackListItem
      key={constructKey(track, soundscape)}
      soundscapeIndex={soundscape.index}
      loop={track}
      isVisible={soundscape.isOpen}
    />
  } else if (isOneShot(track)) {
    // TODO:
    return null;
  } else if (isUnloaded(track)) {
    return <UnloadedTrackListItem
      key={constructKey(track, soundscape)}
      unloadedTrack={track}
      soundscapeIndex={soundscape.index}
    />
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