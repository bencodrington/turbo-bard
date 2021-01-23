import React from "react";

import "./Tag.scss";

type TagProps = {
  text: string
  onClick?: (tagText: string) => void
};

export default function Tag({ text, onClick }: TagProps) {

  const handleClick = () => {
    if (onClick !== undefined) {
      onClick(text);
    }
  }

  const className = 'tag-container' +
    (onClick !== undefined ? ' clickable' : '');

  return (
    <span
      className={className}
      onClick={handleClick}
    >
      {onClick !== undefined ? '+ ' : ''}
      {text}
    </span>
  );
}