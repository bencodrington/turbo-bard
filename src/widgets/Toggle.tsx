import React from "react";

import "./Toggle.scss";

interface ToggleProps {
  id: string;
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
  icon?: string;
  isLabelTextColorSubdued?: boolean;
}
export default function Toggle({
  id,
  label,
  isChecked,
  onToggle,
  isDisabled = false,
  icon,
  isLabelTextColorSubdued = true,
}: ToggleProps) {
  return (
    <div className={`toggle-container${isDisabled ? " is-disabled" : ""}`}>
      <label htmlFor={id} style={{ userSelect: "none" }}>
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={onToggle}
          disabled={isDisabled}
        ></input>
        <span className="slider">
          {icon && (
            <span className="thumb">
              <i className={`fa fa-${icon}`} />
            </span>
          )}
        </span>
        <span
          className={`label-text ${isLabelTextColorSubdued ? "subdued" : ""}`}
        >
          {label}
        </span>
      </label>
    </div>
  );
}
