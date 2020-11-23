import React from "react";
import { isLoop, Track } from "../../models/Track";
import LoopTrackListItem from "./LoopTrackListItem";

import "./TrackListItem.scss";

type TrackListItemProps = {
  track: Track
};

export default function TrackListItem({ track }: TrackListItemProps) {
  if (isLoop(track)) {
    return <LoopTrackListItem loop={track} />
  }
  return null;
}