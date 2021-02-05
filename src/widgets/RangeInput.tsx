import React from "react";
import Slider from '@material-ui/core/Slider';

import "./RangeInput.scss";

type RangeInputProps = {
  min: number,
  max: number,
  value: number | number[],
  onValueChange: (newValue: number | number[]) => void,
  step?: number,
  className?: string,
  ariaLabel?: string,
  getAriaValueText?: (value: number) => string,
  showTicks?: boolean
};

export default function RangeInput({
  min,
  max,
  value,
  step = 0.02,
  onValueChange,
  ariaLabel,
  getAriaValueText,
  className = '',
  showTicks = false
}: RangeInputProps) {
  const onChange = (e: React.ChangeEvent<{}>, value: number | number[]) => {
    onValueChange(value);
  };
  return (
    <Slider
      getAriaValueText={getAriaValueText}
      aria-label={ariaLabel}
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={onChange}
      classes={{
        root: 'range-input-container ' + className,
        thumb: 'handle',
        track: 'track',
        rail: 'rail',
        vertical: 'vertical'
      }}
      marks={showTicks}
    />
  );
}