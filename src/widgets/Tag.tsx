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

  return (
    <span
      className="tag-container"
      onClick={handleClick}
    >
      {onClick !== undefined ? '+ ' : ''}
      {text}
    </span>
  );
}