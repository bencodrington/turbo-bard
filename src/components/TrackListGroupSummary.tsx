import React from "react";
import { Track } from "../models/Track";

import "./TrackListGroupSummary.scss";

type TrackListGroupSummaryProps = {
  tracks: Track[]
};

export default function TrackListGroupSummary({
  tracks
}: TrackListGroupSummaryProps) {
  const playingCount = tracks.filter(track => track.isPlaying).length;
  const notPlayingCount = tracks.length - playingCount;
  return (
    <div className="track-list-group-summary-container">
      {playingCount > 0 && <div className={'flame playing'} />}
      {playingCount > 0 && <label>×{playingCount}</label>}
      {notPlayingCount > 0 && <div className={'flame'} />}
      {notPlayingCount > 0 && <label>×{notPlayingCount}</label>}
    </div>
  );
}