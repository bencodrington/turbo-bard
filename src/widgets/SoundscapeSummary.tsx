import React from "react";
import { isLoop, isOneShot, Track } from "../models/Track";

import "./SoundscapeSummary.scss";

type SoundscapeSummaryProps = {
  tracks: Track[]
};

export default function SoundscapeSummary({ tracks }: SoundscapeSummaryProps) {

  const loopCount = tracks.filter(track => isLoop(track)).length;
  const oneShotCount = tracks.filter(track => isOneShot(track)).length;

  return (
    <div className="soundscape-summary-container">
      {
        Array.from({ length: loopCount }, (_, index) =>
          <div
            key={"dot--loop-" + index}
            className="dot dot--loop"
          />
        )
      }
      {
        Array.from({ length: oneShotCount }, (_, index) =>
          <div
            key={"dot--one-shot-" + index}
            className="dot dot--one-shot"
          />
        )
      }
    </div>
  );
}