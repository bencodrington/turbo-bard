import React from "react";

// import "./TrackSource.scss";

type TrackSourceProps = {
  source?: {
    author?: string,
    url: string
  }
};

export default function TrackSource({ source }: TrackSourceProps) {
  return (
    <div>
      <p>Source: {source
        ? source.author ?? ''
        : '...'
      }</p>
      {
        source
          ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.url}</a>
          : null
      }
    </div>
  );
}