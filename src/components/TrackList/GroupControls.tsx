import React from "react";
import { useDispatch } from "react-redux";
import { startAllInGroup, stopAllInGroup, transitionToGroup } from "../../slices/groups";
import { isAnotherGroupPlaying } from "../../utils/storeUtil";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import startAllIcon from "../../assets/icon-start-all.svg";
import stopIcon from "../../assets/icon-stop.svg";
import transitionToIcon from "../../assets/icon-transition-to.svg";
import { Track } from "../../models/Track";
import { useGroups } from "../../slices";

import "./GroupControls.scss";

type GroupControlsProps = {
  groupIndex: number,
  tracks: Track[]
};

export default function GroupControls({
  groupIndex,
  tracks
}: GroupControlsProps) {
  const groups = useGroups();
  const dispatch = useDispatch();
  const firstPlayingChild = tracks.find(track => track.isPlaying === true);
  const isChildPlaying = firstPlayingChild !== undefined;
  const _isAnotherGroupPlaying = isAnotherGroupPlaying(groupIndex, groups);
  function startAll() {
    dispatch(startAllInGroup({ groupIndex }));
  }
  function stopAll() {
    dispatch(stopAllInGroup({ groupIndex }));
  }
  function transitionTo() {
    dispatch(transitionToGroup({ groupIndex }));
  }
  return (
    <div className="group-controls-container">
      {tracks.length >= 2
        ? <DefaultButton
          onClick={isChildPlaying ? stopAll : startAll}
          icon={isChildPlaying ? stopIcon : startAllIcon}
          text={(isChildPlaying ? 'Stop' : 'Start') + ' all'}
        />
        : null
      }
      {!isChildPlaying && _isAnotherGroupPlaying
        ? <DefaultButton
          onClick={transitionTo}
          icon={transitionToIcon}
          text={'Transition to'}
        />
        : null
      }
    </div>
  );
}