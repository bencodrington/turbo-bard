import React from "react";

import "./Tag.scss";

type TagProps = {
  text: string
  onClick?: (tagText: string) => void
};

export default function Tag({ text, onClick }: TagProps) {

  const isClickable = onClick !== undefined;

  const handleClick = () => {
    if (onClick !== undefined) {
      onClick(text);
    }
  }

  const className = 'tag-container' +
    (isClickable ? ' clickable' : '');


  function onKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
    switch (event.key) {
      case 'Enter':
        handleClick();
        break;
      case ' ':
        handleClick();
        break;
    }
  }

  return (
    <span
      className={className}
      onClick={handleClick}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={onKeyDown}
    >
      {isClickable ? '+ ' : ''}
      {text}
    </span>
  );
}