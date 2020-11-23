import React from "react";
import { isLoop, Track } from "../../models/Track";
import LoopTrackListItem from "./LoopTrackListItem";

import "./TrackListItem.scss";

type TrackListItemProps = {
  track: Track,
  soundscapeIndex: number
};

export default function TrackListItem({ track, soundscapeIndex }: TrackListItemProps) {
  if (isLoop(track)) {
    return <LoopTrackListItem
      soundscapeIndex={soundscapeIndex}
      loop={track}
    />
  }
  return null;
}