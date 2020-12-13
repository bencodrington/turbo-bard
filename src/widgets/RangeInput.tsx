import React, { useEffect, useRef } from "react";
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

// import "./RangeInput.scss";

type RangeInputProps = {
  min: number,
  max: number,
  value: number,
  onValueChange: (newValue: number) => void,
  isVertical?: boolean,
  className?: string
};

export default function RangeInput({
  min,
  max,
  value,
  onValueChange,
  isVertical = false,
  className = ''
}: RangeInputProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current === null) return;
    let options = {
      start: value,
      range: { min, max },
      connect: [true, false], // Colour in one side of the slider
      orientation: 'horizontal',
      direction: 'ltr'
    } as {
      start: number,
      range: { min: number, max: number }
      orientation: 'horizontal' | 'vertical',
      direction: 'ltr' | 'rtl'
    };
    if (isVertical) {
      options.orientation = 'vertical'
      // Flip so 0 is at the bottom
      options.direction = 'rtl'
    }
    const slider = noUiSlider.create(sliderRef.current, options);
    slider.on('update', (values, handle) => {
      onValueChange(values[handle])
    });
  }, []);

  return (
    <div
      className={className}
      ref={sliderRef}
    />
  );
}