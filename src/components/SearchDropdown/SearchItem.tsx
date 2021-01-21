import React from "react";
import { SearchResult } from "../../models/SearchResult";
import Tag from "../../widgets/Tag";
import { ObjectType } from "../../models/ObjectTypes";

import "./SearchItem.scss";

type SearchItemProps = {
  data: SearchResult,
  onClick: () => void
};

const CLASS_NAMES = {
  [ObjectType.LOOP]: 'loop',
  [ObjectType.ONESHOT]: 'one-shot',
  [ObjectType.SOUNDSCAPE]: 'pack'
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