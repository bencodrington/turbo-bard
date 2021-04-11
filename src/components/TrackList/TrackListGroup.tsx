import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import closeMultipleIcon from "../../assets/icon-close-multiple.svg";
import { Group } from "../../models/Group";

import "./TrackListGroup.scss";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop, Track } from "../../models/Track";
import LoopTrackItem from "./LoopTrackItem";
import OneShotTrackItem from "./OneShotTrackItem";
import UnloadedTrackItem from "./UnloadedTrackItem";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import { SearchResult } from "../../models/SearchResult";
import { NEW_GROUP } from "./TrackList";
import GroupControls from "./GroupControls";
import { removeGroup, setGroupName } from "../../slices/groups";
import { useDispatch } from "react-redux";
import EditableHeader from "../../widgets/EditableHeader";
import AddSoundsButton from "../../widgets/buttons/AddSoundsButton";

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
      isSearchOpen={isSearchOpen}
      onTagClick={appendSearchText}
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
  const dispatch = useDispatch();
  const isSearchModeActive = searchTarget !== null;
  const isThisGroupSearching = searchTarget === group.index;

  function onCloseButtonClick() {
    dispatch(removeGroup({ groupIndex: group.index }));
  }

  function saveGroupName(name: string) {
    dispatch(setGroupName({ groupIndex: group.index, name }));
  }

  return (
    <div className="group-container">
      <div className="header">
        <EditableHeader
          initialText={group.name}
          onSave={saveGroupName}
        />
        <DefaultButton
          onClick={onCloseButtonClick}
          icon={closeMultipleIcon}
          isRound={true}
          isDisabled={isSearchModeActive}
        />
      </div>
      <GroupControls
        groupIndex={group.index}
        tracks={group.tracks}
      />
      <div className="tracks">
        {group.tracks.map(track =>
          listItemFromTrack(track, group, isSearchModeActive, appendSearchText)
        )}
      </div>
      {
        isThisGroupSearching
          ? <TrackSearchDropdown
            closeSearchDropdown={() => { setSearchTarget(null) }}
            searchText={searchText}
            setSearchText={setSearchText}
            appendSearchText={appendSearchText}
            isFetchingResults={isFetchingResults}
            results={results}
            searchTarget={searchTarget}
          />
          : <AddSoundsButton
            onClick={() => setSearchTarget(group.index)}
            text={`Add sounds to "${group.name}"`}
          />
      }
    </div >
  );
}