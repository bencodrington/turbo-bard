import React from "react";
import { Track } from "../../models/Track";

import "./TrackListItem.scss";

type TrackListItemProps = {
  track: Track
};

export default function TrackListItem({ track }: TrackListItemProps) {
  const { trackMetadata } = track;
  return (
    <div>
      <p>{trackMetadata.name}</p>
    </div>
  );
}