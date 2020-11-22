import React from "react";

import './SearchDropdown.scss';

type SearchDropdownProps = {
  isFetchingResults: Boolean,
  searchField: JSX.Element,
  results: JSX.Element[],
  suggestions: JSX.Element[],
  trailing?: JSX.Element
};

export default function SearchDropdown(props: SearchDropdownProps) {
  const trailing = props.trailing ?? null;

  const results = props.isFetchingResults
    ? <p>Loading...</p>
    : props.results;
  return (
    <div className="search-dropdown-container">
      {props.searchField}
      {/* TODO: suggestions */}
      {results}
      {trailing}
    </div>
  );
}