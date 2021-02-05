import React from "react";
import { isNumberArray } from "../../utils/typeUtil";
import RangeInput from "../../widgets/RangeInput";

import "./OneShotRange.scss";

type OneShotRangeProps = {
  isPlaying: boolean,
  minSecondsBetween: number,
  maxSecondsBetween: number,
  isConfigurable: boolean
};

const TIME_OPTIONS = [
  0.5, 1, 2, 5, 10, 15, 20, 30, 45, 60, 120, 180
];

function getTimeOptionIndex(time: number) {
  return TIME_OPTIONS.findIndex(option => option >= time) ?? (TIME_OPTIONS.length - 1);
}

export default function OneShotRange({
  isPlaying,
  minSecondsBetween,
  maxSecondsBetween,
  isConfigurable
}: OneShotRangeProps) {
  if (!isConfigurable) {
    return (
      <div className="one-shot-range-container">
        play{isPlaying ? 'ing' : ''} every
        <span className="number"> {minSecondsBetween} </span>
      to
        <span className="number"> {maxSecondsBetween} </span>
      seconds
      </div>
    );
  }
  function onHandleMoved(newValues: number | number[]) {
    // Coerce value to type number, since RangeInput
    //  can have a single handle
    if (!isNumberArray(newValues)) return;
    console.log('new value', newValues, TIME_OPTIONS[newValues[0]], TIME_OPTIONS[newValues[1]]);
  }
  return (
    <div className="one-shot-range-container one-shot-range-container--configurable">
      <div className="sentence">
        play{isPlaying ? 'ing' : ''} every
        <span className="number"> {minSecondsBetween} </span>
        to
        <span className="number"> {maxSecondsBetween} </span>
        seconds
      </div>
      <RangeInput
        className="one-shot-range-input"
        min={0}
        max={TIME_OPTIONS.length - 1}
        step={1}
        onValueChange={onHandleMoved}
        value={[minSecondsBetween, maxSecondsBetween].map(getTimeOptionIndex)}
        showTicks={true}
      // TODO: aria value label
      />
    </div>
  );

}