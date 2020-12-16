import React from "react";
import useBoolean from "../../hooks/useBoolean";
import { Soundscape } from "../../models/Soundscape";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop, Track } from "../../models/Track";
import { fetchTrackResults } from "../../services/database";
import { useSoundscapes } from "../../slices";
import AddTrackButton from "../../widgets/buttons/AddTrackButton";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import useSearchResults from "../SearchDropdown/useSearchResults";
import LoopTrackListItem from "./LoopTrackListItem";
import TrackListHeader from "./TrackListHeader";
import UnloadedTrackListItem from "./UnloadedTrackListItem";

function constructKey(track: Track, soundscape: Soundscape) {
  return soundscape.index + '-' + track.index;
}

function listItemFromTrack(
  track: Track,
  soundscape: Soundscape,
  isSearchOpen: boolean,
  appendSearchText: (text: string) => void
) {
  if (isLoop(track) || isUnloadedLoop(track)) {
    return <LoopTrackListItem
      key={constructKey(track, soundscape)}
      soundscapeIndex={soundscape.index}
      loop={track}
      isVisible={soundscape.isOpen}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
    />
  } else if (isOneShot(track)) {
    // TODO:
    return null;
  } else if (isUnloaded(track)) {
    return <UnloadedTrackListItem
      key={constructKey(track, soundscape)}
      unloadedTrack={track}
      soundscapeIndex={soundscape.index}
      isVisible={soundscape.isOpen}
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
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText
  } = useSearchResults(fetchTrackResults);

  return (
    <div className="track-list-container">
      <TrackListHeader />
      <AddTrackButton onClick={toggleIsSearchOpen} />
      {isSearchOpen
        ? <TrackSearchDropdown
          closeSearchDropdown={() => { setIsSearchOpen(false) }}
          searchText={searchText}
          setSearchText={setSearchText}
          appendSearchText={appendSearchText}
          isFetchingResults={isFetchingResults}
          results={results}
        />
        : null
      }
      {
        soundscapes.map(soundscape =>
          soundscape.tracks.map(track =>
            listItemFromTrack(track, soundscape, isSearchOpen, appendSearchText)
          )
        )
      }
    </div>
  );
}