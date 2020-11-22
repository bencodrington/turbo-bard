import React from "react";
import { SearchResult } from "../../models/SearchResult";

type SearchItemProps = {
  data: SearchResult,
  onClick: () => void
};

export default function SearchItem({ data, onClick }: SearchItemProps) {
  return (
    <li
      className="search-dropdown-item-container"
      onClick={onClick}
    >
      {data.name}
    </li>
  );
}