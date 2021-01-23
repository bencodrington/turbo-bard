import React from "react";
import useTrackData from "../../hooks/useTrackData";
import { UnloadedTrack } from "../../models/Track";
import { ERROR_TYPE } from "../../models/DatabaseTypes";

// import "./UnloadedTrackItem.scss";

type UnloadedTrackItemProps = {
  groupIndex: number,
  unloadedTrack: UnloadedTrack,
  isVisible: boolean
};

export default function UnloadedTrackItem({
  unloadedTrack,
  groupIndex,
  isVisible
}: UnloadedTrackItemProps) {
  const { id, index, type } = unloadedTrack;
  useTrackData(id, index, groupIndex, type === ERROR_TYPE);
  if (!isVisible) return null;
  const output = type === ERROR_TYPE ? 'Failed to load track.' : 'Loading ambiguous track';
  return (
    <p>{output}</p>
  );
}