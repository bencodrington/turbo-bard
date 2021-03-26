import React from "react";
import AnchorButton from "../../widgets/buttons/AnchorButton";

import "./TrackSource.scss";

type TrackSourceProps = {
  source?: {
    author?: string,
    urls: string[]
  }
};

export default function TrackSource({ source }: TrackSourceProps) {
  return (
    <div className="track-source-container">
      <div className="title">
        <p><label>Source</label>{source
          ? source.author ?? ''
          : '...'
        }</p>
        <div className="filler" />
      </div>
      {
        source
          ? source.urls.map(url => <AnchorButton url={url} key={url} />)
          : null
      }
    </div>
  );
}