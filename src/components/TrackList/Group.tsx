import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import MoreIcon from "../../assets/icon-more.svg";
import AddIcon from "../../assets/icon-add.svg";
import { Soundscape } from "../../models/Soundscape";

import "./Group.scss";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop, Track } from "../../models/Track";
import LoopTrackListItem from "./LoopTrackListItem";
import OneShotTrackListItem from "./OneShotTrackListItem";
import UnloadedTrackListItem from "./UnloadedTrackListItem";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import { SearchResult } from "../../models/SearchResult";
import { NEW_GROUP } from "../TrackList/TrackList";

type GroupProps = {
  searchTarget: number | null | typeof NEW_GROUP,
  setSearchTarget: (searchTarget: number | null) => void,
  group: Soundscape,
  results: SearchResult[],
  isFetchingResults: boolean,
  searchText: string,
  setSearchText: (searchText: string) => void,
  appendSearchText: (searchText: string) => void
};

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

export default function Group({
  searchTarget,
  setSearchTarget,
  group,
  results,
  isFetchingResults,
  searchText,
  setSearchText,
  appendSearchText
}: GroupProps) {
  const isSearchModeActive = searchTarget !== null;
  const isThisGroupSearching = searchTarget === group.index;
  return (
    <div className="group-container">
      <div className="header">
        <DefaultButton
          onClick={() => { console.log('Show options for ' + group.name) }}
          icon={MoreIcon}
          isRound={true}
        />
        <h3 className="name">{group.name}</h3>
      </div>
      <div className="group__body">
        <div className="collapse-bar" />
        <div className="tracks">
          {group.tracks.map(track =>
            listItemFromTrack(track, group, isSearchModeActive, appendSearchText)
          )}
        </div>
      </div>
      {isThisGroupSearching
        ? <TrackSearchDropdown
          closeSearchDropdown={() => { setSearchTarget(null) }}
          searchText={searchText}
          setSearchText={setSearchText}
          appendSearchText={appendSearchText}
          isFetchingResults={isFetchingResults}
          results={results}
          searchTarget={searchTarget}
        />
        : <DefaultButton
          className='add-sounds-button'
          onClick={() => setSearchTarget(group.index)}
          icon={AddIcon}
          isRound={true}
        />
      }
    </div>
  );
}