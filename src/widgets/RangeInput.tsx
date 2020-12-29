import React from "react";
import Slider from '@material-ui/core/Slider';

import "./RangeInput.scss";

type RangeInputProps = {
  min: number,
  max: number,
  value: number,
  onValueChange: (newValue: number) => void,
  isVertical?: boolean,
  className?: string,
  ariaLabel?: string,
  getAriaValueText?: (value: number) => string
};

export default function RangeInput({
  min,
  max,
  value,
  onValueChange,
  isVertical = false,
  ariaLabel,
  getAriaValueText,
  className = ''
}: RangeInputProps) {
  const onChange = (e: React.ChangeEvent<{}>, value: number | number[]) => {
    if ((value as number[]).length !== undefined) return;
    onValueChange(value as number);
  };
  return (
    <Slider
      orientation={isVertical ? 'vertical' : 'horizontal'}
      getAriaValueText={getAriaValueText}
      aria-label={ariaLabel}
      min={min}
      max={max}
      value={value}
      step={0.01} // TODO: prop with default
      onChange={onChange}
      classes={{
        root: 'range-input-container ' + className,
        thumb: 'handle',
        track: 'track',
        rail: 'rail',
        vertical: 'vertical'
      }}
    />
  );
}