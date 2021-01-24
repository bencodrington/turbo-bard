import React from "react";
import { SearchResult } from "../../models/SearchResult";
import Tag from "../../widgets/Tag";

import "./SearchItem.scss";

type SearchItemProps = {
  data: SearchResult,
  onClick: () => void
};

export default function SearchItem({ data, onClick }: SearchItemProps) {
  let packCountElement = null;
  if (data.tracks !== undefined) {
    packCountElement = (
      <span className="pack-count">
        <span className="pack-count__number">{data.tracks.length}</span>
      pack
      </span>
    );
  }
  const filteredTags = data.tags.filter(tag => tag !== 'pack');
  return (
    <li
      className="search-item-container"
      onClick={onClick}
    >
      <h4>{data.name}</h4>
      {packCountElement}
      {filteredTags.map((tag, index) =>
        <Tag key={index} text={tag} />
      )}
    </li>
  );
}