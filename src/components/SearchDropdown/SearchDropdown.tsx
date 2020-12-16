import React from "react";

import './SearchDropdown.scss';

type SearchDropdownProps = {
  isFetchingResults: Boolean,
  searchField: JSX.Element,
  results: JSX.Element[],
  suggestions: JSX.Element[],
  trailing?: JSX.Element
  className?: string
};

export default function SearchDropdown(props: SearchDropdownProps) {
  const trailing = props.trailing ?? null;

  const results = props.isFetchingResults
    ? <p>Loading...</p>
    : <ul>{props.results}</ul>;

  const className = 'search-dropdown-container ' + (props.className ?? '');
  return (
    <div className={className}>
      {props.searchField}
      <div className="suggestions">
        {props.suggestions}
      </div>
      {results}
      {trailing}
    </div>
  );
}