import React from "react";
import { Track } from "../models/Track";

import "./TrackListGroupSummary.scss";

type TrackListGroupSummaryProps = {
  tracks: Track[]
};

export default function TrackListGroupSummary({
  tracks
}: TrackListGroupSummaryProps) {
  return (
    <div>
      {tracks.map(track =>
        <div
          key={track.index}
          className={'flame' + (track.isPlaying ? ' playing' : '')}
        />
      )}
    </div>
  );
}