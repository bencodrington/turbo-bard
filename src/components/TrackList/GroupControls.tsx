import React from "react";
import { useDispatch } from "react-redux";
import { startAllInGroup, stopAllInGroup, transitionToGroup } from "../../slices/groups";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import startAllIcon from "../../assets/icon-start-all.svg";
import stopIcon from "../../assets/icon-stop.svg";
import transitionToIcon from "../../assets/icon-transition-to.svg";
import { Track } from "../../models/Track";

import "./GroupControls.scss";

type GroupControlsProps = {
  groupIndex: number,
  tracks: Track[]
};

export default function GroupControls({
  groupIndex,
  tracks
}: GroupControlsProps) {
  const dispatch = useDispatch();
  if (tracks.length < 2) return null;
  const firstPlayingChild = tracks.find(track => track.isPlaying === true);
  const isChildPlaying = firstPlayingChild !== undefined;
  function startAll() {
    dispatch(startAllInGroup({ groupIndex }));
  }
  function stopAll() {
    dispatch(stopAllInGroup({ groupIndex }));
  }
  function transitionTo() {
    dispatch(transitionToGroup({ groupIndex}));
  }
  return (
    <div className="group-controls-container">
      <DefaultButton
        onClick={isChildPlaying ? stopAll: startAll}
        icon={isChildPlaying ? stopIcon : startAllIcon}
        text={(isChildPlaying ? 'Stop' : 'Start') + ' all'}
      />
      <DefaultButton
        onClick={transitionTo}
        icon={transitionToIcon}
        text={'Transition to'}
      />
    </div>
  );
}