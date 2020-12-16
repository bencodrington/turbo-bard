import React from "react";
import loopIcon from "../assets/icon-loop.svg";
import oneShotIcon from "../assets/icon-one-shot.svg";

import "./Tag.scss";

type TagProps = {
  text: string
  onClick?: (tagText: string) => void
};

export default function Tag({ text, onClick }: TagProps) {
  const className = 'tag-container ' +
    (onClick !== undefined ? 'clickable ' : '') +
    (text === 'loop' || text === 'one-shot' ? `tag--${text}` : '');

  const handleClick = () => {
    if (onClick !== undefined) {
      onClick(text);
    }
  }

  const trailingIconSrc =
    text === 'loop' ? loopIcon :
    text === 'one-shot' ? oneShotIcon :
    null;

  const trailingIcon = trailingIconSrc !== null ?
    <img src={trailingIconSrc} alt="" className="trailing-icon" /> :
    null;

  return (
    <span
      className={className}
      onClick={handleClick}
    >
      {onClick !== undefined ? '+ ' : ''}
      {text}
      {trailingIcon}
    </span>
  );
}