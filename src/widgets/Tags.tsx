import React from "react";

import "./Tags.scss";

type TagsProps = {
  tags: string[],
  isReducedEmphasis: boolean,
};

export default function Tags({ tags, isReducedEmphasis }: TagsProps) {
  return (
    <p className={`${"tags-container" +
      (isReducedEmphasis ? ' reduced-emphasis' : '')
      }`}>
      {tags.map(tag => <span key={tag}>{tag}</span>)}
    </p>
  );
}