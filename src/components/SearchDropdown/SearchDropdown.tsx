import React from "react";

type SearchDropdownProps = {
  isFetchingResults: Boolean,
  searchField: JSX.Element,
  results: JSX.Element[],
  suggestions: JSX.Element[],
  trailing?: JSX.Element
};

export default function SearchDropdown(props: SearchDropdownProps) {
  const trailing = props.trailing !== undefined
    ? (
      <div className="trailing">
        {props.trailing}
      </div>
    )
    : null;

  const results = props.isFetchingResults
    ? <p>Loading...</p>
    : props.results;
  return (
    <div className="search-dropdown-container">
      Search Dropdown
      {props.searchField}
      {/* TODO: suggestions */}
      {results}
      {trailing}
    </div>
  );
}