import React from "react";

import "./DurationSelectButton.scss";

interface DurationSelectButtonProps {
  options: number[];
  selectedOption: number;
  onSelectOption: (option: number) => void;
}
export default function DurationSelectButton({
  options,
  selectedOption,
  onSelectOption,
}: DurationSelectButtonProps) {
  return (
    <div className="duration-select-button-container">
      {options.map((option) => (
        <div
          className={`option ${option === selectedOption ? "selected" : ""}`}
          onClick={() => onSelectOption(option)}
          key={option}
        >
          <span className="big-numbers">{option}</span>s
        </div>
      ))}
    </div>
  );
}
