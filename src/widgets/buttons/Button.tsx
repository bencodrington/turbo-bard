import React from "react";

import "./Button.scss";

export enum ButtonType {
  Default = '',
  Primary = 'primary'
}

type ButtonProps = {
  text?: string,
  type?: ButtonType,
  icon?: string, // icon should be an imported image
  iconAltText?: string,
  onClick: () => void,
  className?: string,
  isHeaderButtonWidth?: boolean,
  isEditButtonWidth?: boolean,
};

export default function Button({
  text,
  type,
  icon,
  iconAltText,
  onClick,
  className,
  isHeaderButtonWidth,
  isEditButtonWidth,
}: ButtonProps) {

  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent = icon === undefined ? null : <img src={icon} alt={iconAltText ?? ''} />;

  const computedClassName = 'button-container '
    + (className ? className + ' ' : '')
    + (icon !== undefined && text === undefined ? 'icon-only ' : '')
    + (isHeaderButtonWidth ? 'header-button-width ' : '')
    + (isEditButtonWidth ? 'edit-button-width ' : '')
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