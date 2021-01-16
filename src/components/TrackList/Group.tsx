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

type GroupProps = {
  isSearchModeActive: boolean,
  isThisGroupSearching: boolean,
  group: Soundscape
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

function appendSearchText(text: string) {
  console.log('TODO: append search text: ' + text);
}

export default function Group({
  isSearchModeActive,
  isThisGroupSearching,
  group
}: GroupProps) {
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
      {/* TODO: add group-specific searchbars {isThisGroupSearching ?} */}
      <DefaultButton
        className='add-sounds-button'
        onClick={() => { console.log('Show options for ' + group.name) }}
        icon={AddIcon}
        isRound={true}
      />
    </div>
  );
}