import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import MoreIcon from "../../assets/icon-more.svg";
import StartAllIcon from "../../assets/icon-start-all.svg";
import AddIcon from "../../assets/icon-add.svg";
import { Group } from "../../models/Group";

import "./TrackListGroup.scss";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop, Track } from "../../models/Track";
import LoopTrackItem from "./LoopTrackItem";
import OneShotTrackItem from "./OneShotTrackItem";
import UnloadedTrackItem from "./UnloadedTrackItem";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import { SearchResult } from "../../models/SearchResult";
import { NEW_GROUP } from "./TrackList";
import { useDispatch } from "react-redux";
import { startAllInGroup } from "../../slices/groups";

type GroupProps = {
  searchTarget: number | null | typeof NEW_GROUP,
  setSearchTarget: (searchTarget: number | null) => void,
  group: Group,
  results: SearchResult[],
  isFetchingResults: boolean,
  searchText: string,
  setSearchText: (searchText: string) => void,
  appendSearchText: (searchText: string) => void
};

function constructKey(track: Track, group: Group) {
  return group.index + '-' + track.index;
}

function listItemFromTrack(
  track: Track,
  group: Group,
  isSearchOpen: boolean,
  appendSearchText: (text: string) => void
) {
  if (isLoop(track) || isUnloadedLoop(track)) {
    return <LoopTrackItem
      key={constructKey(track, group)}
      groupIndex={group.index}
      loop={track}
      isVisible={true}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
      groupVolume={group.volume}
    />
  } else if (isOneShot(track)) {
    return <OneShotTrackItem
      key={constructKey(track, group)}
      groupIndex={group.index}
      oneShot={track}
      isVisible={true}
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
      groupVolume={group.volume}
    />
  } else if (isUnloaded(track)) {
    return <UnloadedTrackItem
      key={constructKey(track, group)}
      unloadedTrack={track}
      groupIndex={group.index}
      isVisible={true}
    />
  } else {
    return null;
  }
}

export default function TrackListGroup({
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

  const dispatch = useDispatch();
  function startAll() {
    dispatch(startAllInGroup({ groupIndex: group.index }));
  }
  return (
    <div className="group-container">
      <div className="header">
        <DefaultButton
          onClick={() => { console.log('Show options for ' + group.name) }}
          icon={MoreIcon}
          isRound={true}
          isDisabled={isSearchModeActive}
        />
        <h3 className="name">{group.name}</h3>
      </div>
      <div className="group-controls">
        <DefaultButton
          onClick={startAll}
          icon={StartAllIcon}
          text="Start all"
        />
      </div>
      <div className="tracks">
        {group.tracks.map(track =>
          listItemFromTrack(track, group, isSearchModeActive, appendSearchText)
        )}
      </div>
      {isThisGroupSearching
        ? <TrackSearchDropdown
          closeSearchDropdown={() => { setSearchTarget(null) }}
          searchText={searchText}
          setSearchText={setSearchText}
          isFetchingResults={isFetchingResults}
          results={results}
          searchTarget={searchTarget}
        />
        : <DefaultButton
          className='add-sounds-button'
          onClick={() => setSearchTarget(group.index)}
          icon={AddIcon}
          isFullWidth={true}
        />
      }
    </div>
  );
}