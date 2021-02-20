import React from "react";

import "./OneShotRange.scss";

type OneShotRangeProps = {
  isPlaying: boolean,
  minSecondsBetween: number,
  maxSecondsBetween: number
};


export default function OneShotRange({
  isPlaying,
  minSecondsBetween,
  maxSecondsBetween
}: OneShotRangeProps) {
  return (
    <div className="one-shot-range-container">
      <span className="sentence">
        play{isPlaying ? 'ing' : ''} every
          <span className="number"> {minSecondsBetween} </span>
          to
          <span className="number"> {maxSecondsBetween} </span>
          seconds
        </span>
    </div>
  );

}