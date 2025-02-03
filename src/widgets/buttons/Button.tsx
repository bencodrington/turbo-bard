import React from "react";

import "./Button.scss";

export enum ButtonType {
  Default = '',
  Primary = 'primary',
  Gradient = 'gradient-outline'
}

type ButtonProps = {
  text?: string,
  type?: ButtonType,
  icon?: string, // icon should be a fontawesome class
  iconColour?: string, // iconColour should be a hex code (with a leading #)
  onClick: () => void,
  className?: string,
  isActive?: boolean,
  isSmall?: boolean,
};

export default function Button({
  text,
  type,
  icon,
  iconColour,
  onClick,
  className,
  isActive,
  isSmall
}: ButtonProps) {

  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent = icon === undefined ? null : <i className={`fa-solid fa-${icon}`} style={{ color: iconColour }} />;

  const computedClassName = 'button-container '
    + (className ? className + ' ' : '')
    + (icon !== undefined && text === undefined ? 'icon-only ' : '')
    + (isActive ? 'active ' : '')
    + (isSmall ? 'small ' : '')
    + (type ? type + ' ' : '')

  return (
    <button
      className={computedClassName}
      onClick={onClick}
    >
      {imgContent}
      {textContent}
    </button>
  )
};