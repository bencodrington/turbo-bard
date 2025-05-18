import React from "react";

import "./Button.scss";
import { getIconClassStringFromIconId } from "../../utils/iconUtil";

export enum ButtonType {
  Default = "",
  Primary = "primary",
  Gradient = "gradient-outline",
}

type ButtonProps = {
  text?: string;
  type?: ButtonType;
  icon?: string; // icon should be a fontawesome class
  iconColour?: string; // iconColour should be a hex code (with a leading #)
  secondaryIcon?: string; // icon should be a fontawesome class
  secondaryIconColour?: string; // colour should be a hex code (with a leading #)
  onClick: () => void;
  className?: string;
  isSmall?: boolean;
  isDisabled?: boolean;
};

export default function Button({
  text,
  type,
  icon,
  iconColour,
  secondaryIcon,
  secondaryIconColour,
  onClick,
  className,
  isSmall,
  isDisabled,
}: ButtonProps) {
  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent =
    icon === undefined ? null : (
      <i
        className={getIconClassStringFromIconId(icon)}
        style={{ color: iconColour }}
      />
    );
  const secondaryIconContent =
    secondaryIcon === undefined ? null : (
      <i
        className={`secondary-icon ${getIconClassStringFromIconId(
          secondaryIcon
        )}`}
        style={{ color: secondaryIconColour ?? "" }}
      />
    );

  const computedClassName =
    "button-container " +
    (className ? className + " " : "") +
    (icon !== undefined && text === undefined ? "icon-only " : "") +
    (isSmall ? "small " : "") +
    (type ? type + " " : "");

  return (
    <button
      className={computedClassName}
      onClick={onClick}
      disabled={isDisabled}
    >
      {imgContent}
      {textContent}
      {secondaryIconContent}
    </button>
  );
}
