import React from "react";

import "./AnchorButton.scss";

type AnchorButtonProps = {
  url: string,
  className?: string,
  icon?: string, // icon should be an imported image
  iconAltText?: string,
  text?: string
};

export default function AnchorButton({
  url,
  className,
  icon,
  iconAltText,
  text
}: AnchorButtonProps) {
  const imgContent = icon === undefined ? null : <img src={icon} alt={iconAltText ?? ''} />;
  const computedClassName = 'anchor-button-container '
    + (className ? className + ' ' : '')
  return (
    <a
      className={computedClassName}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {imgContent}
      <span>{text ?? url}</span>
    </a>
  );
}