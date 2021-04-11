import React from "react";

import './SearchDropdown.scss';

type SearchDropdownProps = {
  isFetchingResults: Boolean,
  searchField: JSX.Element,
  results: JSX.Element[],
  className?: string,
  isSearchTextEmpty: boolean
};

export default function SearchDropdown({
  isFetchingResults,
  results,
  isSearchTextEmpty,
  searchField,
  className
}: SearchDropdownProps) {

  const mainContent = isFetchingResults
    ? <p className="message">Loading...</p>
    : results.length > 0
      ? <ul className="results">{results}</ul>
      : isSearchTextEmpty
        ? null
        : <p className="message">Couldn't find those sounds.</p>;
  return (
    <div className={'search-dropdown-container ' + (className ?? '')}>
      {searchField}
      {mainContent}
    </div>
  );
}