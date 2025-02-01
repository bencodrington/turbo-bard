import React, { useEffect, useState } from "react";

import "./GroupList/shared-group-list-styles.scss";
import "./NowPlayingBanner.scss";
import PlayGroupButton from "../widgets/buttons/PlayGroupButton";
import { getGroupByIndex, getPlayingGroup } from "../utils/storeUtil";
import { useGroups } from "../slices";
import Toggle from "../widgets/Toggle";
import useBoolean from "../hooks/useBoolean";
import { useDispatch } from "react-redux";
import { playGroupSolo } from "../slices/groups";

export default function NowPlayingBanner() {
  const dispatch = useDispatch();
  const groups = useGroups();
  const [mostRecentlyPlayedGroupIndex, setMostRecentlyPlayedGroupIndex] = useState<number | null>(null);
  const playingGroup = getPlayingGroup(groups);
  const mostRecentlyPlayedGroup = mostRecentlyPlayedGroupIndex === null ? null : (getGroupByIndex(mostRecentlyPlayedGroupIndex, groups) ?? null);
  const [isCombatToggleChecked, setIsCombatToggleChecked, toggleIsCombatToggleChecked] = useBoolean(false);
  const toggleIsCombatModeActive = () => {
    if (playingGroup === undefined) return;
    const isStartingCombat = isCombatToggleChecked === false;
    toggleIsCombatToggleChecked();
    dispatch(playGroupSolo({ groupIndex: playingGroup.index, isCombatModeActive: isStartingCombat }));
  }

  // When a group starts playing, record its index to populate the name, icon,
  //  etc. and update the combat toggle to be in sync with the store
  useEffect(() => {
    if (playingGroup !== undefined) {
      setMostRecentlyPlayedGroupIndex(playingGroup.index);
      setIsCombatToggleChecked(playingGroup.combatTracks.some(track => track.isPlaying));
    }
  }, [playingGroup, setMostRecentlyPlayedGroupIndex, setIsCombatToggleChecked])

  const onPlay = () => {
    if (mostRecentlyPlayedGroup === null) return;
    dispatch(playGroupSolo({ groupIndex: mostRecentlyPlayedGroup.index, isCombatModeActive: isCombatToggleChecked }))
  }
  return (
    <div className="now-playing-banner-container">
      <i className="fa-solid fa-mountain-sun group-list-item-icon" />
      <span className="environment-name">{mostRecentlyPlayedGroup?.name}</span>
      <Toggle id="now-playing-banner-combat-toggle" label="Combat" isChecked={isCombatToggleChecked} onToggle={toggleIsCombatModeActive} icon="hand-fist" />
      {mostRecentlyPlayedGroup !== null && <PlayGroupButton group={mostRecentlyPlayedGroup} overriddenPlayFunction={onPlay} />}
    </div>
  )
}