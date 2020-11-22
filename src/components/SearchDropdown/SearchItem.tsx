import React from "react";
import { SearchResult } from "../../models/SearchResult";
import "./SearchItem.scss";

type SearchItemProps = {
  data: SearchResult,
  onClick: () => void
};

export default function SearchItem({ data, onClick }: SearchItemProps) {
  return (
    <li
      className="search-item-container"
      onClick={onClick}
    >
      <h4>{data.name}</h4>
      {data.tags.map((tag, index) =>
        <span key={index}>{tag}</span>
      )}
    </li>
  );
}