import React from "react";

import "./Button.scss";

type ButtonProps = {
  text?: string,
  icon?: string, // icon should be an imported image
  iconAltText?: string,
  onClick: () => void,
  className?: string,
};

export default function Button({
  text,
  icon,
  iconAltText,
  onClick,
  className,
}: ButtonProps) {

  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent = icon === undefined ? null : <img src={icon} alt={iconAltText ?? ''} />;

  const computedClassName = 'button-container '
    + (className ? className + ' ' : '')
    + (icon !== undefined && text === undefined ? 'icon-only ' : '')

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