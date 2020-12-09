import React from "react";

import "./DefaultButton.scss";

type DefaultButtonProps = {
  text?: string,
  icon?: string, // icon should be an imported SVG
  iconAltText?: string,
  onClick: () => void,
  className?: string
};

export default function DefaultButton({ text, icon, iconAltText, onClick, className }: DefaultButtonProps) {

  if (text === undefined && icon === undefined) return null;
  const textContent = text === undefined ? null : <span>{text}</span>;
  const imgContent = icon === undefined ? null : <img src={icon} alt={iconAltText ?? ''} />;

  const imgClass = icon !== undefined ? 'icon-only ' : ''

  return (
    <button
      className={
        'default-button-container ' +
        imgClass +
        className ?? ''
      }
      onClick={onClick}
    >
      {textContent}
      {imgContent}
    </button>
  )
};