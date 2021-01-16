import React from "react";

import "./DefaultButton.scss";

type DefaultButtonProps = {
  text?: string,
  icon?: string, // icon should be an imported SVG
  iconAltText?: string,
  onClick: () => void,
  className?: string,
  isDisabled?: boolean,
  isRound?: boolean
};

export default function DefaultButton({
  text,
  icon,
  iconAltText,
  onClick,
  className,
  isDisabled = false,
  isRound = false,
}: DefaultButtonProps) {

  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent = icon === undefined ? null : <img src={icon} alt={iconAltText ?? ''} />;

  const imgClass = icon !== undefined ? 'icon-only ' : '';
  const shapeClass = isRound ? 'round ' : '';

  return (
    <button
      className={
        'default-button-container ' +
        imgClass +
        shapeClass +
        className ?? ''
      }
      onClick={onClick}
      disabled={isDisabled}
    >
      {imgContent}
      {textContent}
    </button>
  )
};