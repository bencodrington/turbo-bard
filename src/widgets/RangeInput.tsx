import React, { useEffect, useRef, useState } from "react";
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

// import "./RangeInput.scss";

type RangeInputProps = {
  min: number,
  max: number,
  initialValue: number,
  onValueChange: (newValue: number) => void,
  isVertical?: boolean,
  className?: string
};

export default function RangeInput({
  min,
  max,
  initialValue,
  onValueChange,
  isVertical = false,
  className = ''
}: RangeInputProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slider, setSlider] = useState<noUiSlider.noUiSlider | null>(null);

  useEffect(() => {
    if (sliderRef.current === null) return;
    let options = {
      start: initialValue,
      range: { min, max },
      connect: [true, false], // Colour in one side of the slider
      orientation: 'horizontal',
      direction: 'ltr'
    } as noUiSlider.Options;
    if (isVertical) {
      options.orientation = 'vertical';
      // Flip so 0 is at the bottom
      options.direction = 'rtl';
    }
    const slider = noUiSlider.create(sliderRef.current, options);
    setSlider(slider);
    return () => {
      slider.destroy();
      setSlider(null);
    }
  }, [sliderRef, initialValue, min, max, isVertical]);

  useEffect(() => {
    if (slider === null) return;
    function onUpdate(values: any[], handle: number) {
      onValueChange(Number.parseFloat(values[handle]));
    }
    slider.on('update', onUpdate);
    return () => {
      slider.off('update');
    }
  }, [slider, onValueChange]);

  return (
    <div
      className={className}
      ref={sliderRef}
    />
  );
}