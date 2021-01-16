import React from "react";
import useBoolean from "../../hooks/useBoolean";
import { Soundscape } from "../../models/Soundscape";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop, Track } from "../../models/Track";
import { fetchTrackResults } from "../../services/database";
import { useSoundscapes } from "../../slices";
import AddSoundsButton from "../../widgets/buttons/AddSoundsButton";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import useSearchResults from "../SearchDropdown/useSearchResults";
import LoopTrackListItem from "./LoopTrackListItem";
import OneShotTrackListItem from "./OneShotTrackListItem";
import UnloadedTrackListItem from "./UnloadedTrackListItem";

import "./TrackList.scss";

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
      isVisible={true}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
      soundscapeVolume={soundscape.volume}
    />
  } else if (isOneShot(track)) {
    return <OneShotTrackListItem
      key={constructKey(track, soundscape)}
      soundscapeIndex={soundscape.index}
      oneShot={track}
      isVisible={true}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
      soundscapeVolume={soundscape.volume}
    />
  } else if (isUnloaded(track)) {
    return <UnloadedTrackListItem
      key={constructKey(track, soundscape)}
      unloadedTrack={track}
      soundscapeIndex={soundscape.index}
      isVisible={true}
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
      {isSearchOpen
        ? <TrackSearchDropdown
          closeSearchDropdown={() => { setIsSearchOpen(false) }}
          searchText={searchText}
          setSearchText={setSearchText}
          appendSearchText={appendSearchText}
          isFetchingResults={isFetchingResults}
          results={results}
        />
        : <AddSoundsButton onClick={toggleIsSearchOpen} />
      }
      {
        soundscapes.map(soundscape =>
          [
            <h3 key={soundscape.index}>{soundscape.name}</h3>,
            soundscape.tracks.map(track =>
              listItemFromTrack(track, soundscape, isSearchOpen, appendSearchText)
            )
          ]
        )
      }
    </div>
  );
}