import React from "react";
import AnchorButton from "../../widgets/buttons/AnchorButton";

import "./TrackSource.scss";

type TrackSourceProps = {
  source?: {
    author?: string,
    url: string
  }
};

export default function TrackSource({ source }: TrackSourceProps) {
  return (
    <div className="track-source-container">
      <p>Source: {source
        ? source.author ?? ''
        : '...'
      }</p>
      {
        source
          ? <AnchorButton url={source.url} />
          : null
      }
    </div>
  );
}