import React from "react";

import "./PlayGroupButton.scss";
import { Group } from "../../models/Group";
import { isGroupPlaying } from "../../utils/storeUtil";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { playGroupSolo, stopAllInGroup } from "../../slices/groups";
import { isGroupPlayable } from "../../utils/groupUtil";

interface PlayGroupButtonProps {
  group: Group;
  overriddenPlayFunction?: () => void;
}
export default function PlayGroupButton({
  group,
  overriddenPlayFunction,
}: PlayGroupButtonProps) {
  const dispatch = useDispatch();

  const playSolo = () => {
    if (overriddenPlayFunction !== undefined) {
      overriddenPlayFunction();
      return;
    }
    dispatch(playGroupSolo({ groupIndex: group.index }));
  };
  const stop = () => {
    dispatch(stopAllInGroup({ groupIndex: group.index }));
  };

  return (
    <div
      className={`play-group-button-container ${
        isGroupPlayable(group) ? "" : "disabled"
      }`}
      onClick={isGroupPlaying(group) ? stop : playSolo}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="50"
        viewBox="0 0 173.20508075688772 200"
        className="hexagon"
      >
        <path
          strokeWidth="5"
          fill="none"
          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
        />
      </svg>
      {isGroupPlaying(group) ? (
        <Button
          icon="pause"
          onClick={stop}
          isDisabled={!isGroupPlayable(group)}
        />
      ) : (
        <Button
          icon="play"
          onClick={playSolo}
          isDisabled={!isGroupPlayable(group)}
        />
      )}
    </div>
  );
}
