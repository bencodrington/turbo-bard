import React from "react";
import Tag from "../widgets/Tag";

import "./TagList.scss";

type TagListProps = {
  tags: string[],
  onTagClick: (tag: string) => void
};

export default function TagList({ tags, onTagClick }: TagListProps) {
  return (
    <div className="tag-list-container">
      {
        tags.map(tag => (
          <Tag
            key={tag}
            text={tag}
            onClick={onTagClick}
          />
        ))
      }
    </div>
  );
}