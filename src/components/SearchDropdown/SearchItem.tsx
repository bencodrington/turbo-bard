import React from "react";
import { SearchResult } from "../../models/SearchResult";
import Tag from "../../widgets/Tag";
import { OBJECT_TYPES } from "../../models/ObjectTypes";

import "./SearchItem.scss";

type SearchItemProps = {
  data: SearchResult,
  onClick: () => void
};

const CLASS_NAMES = {
  [OBJECT_TYPES.LOOP]: 'loop',
  [OBJECT_TYPES.ONESHOT]: 'one-shot',
  [OBJECT_TYPES.SOUNDSCAPE]: ''
};

export default function SearchItem({ data, onClick }: SearchItemProps) {
  return (
    <li
      className="search-item-container"
      onClick={onClick}
    >
      <h4 className={CLASS_NAMES[data.type] ?? ''}>{data.name}</h4>
      {data.tags.map((tag, index) =>
        <Tag key={index} text={tag} />
      )}
    </li>
  );
}