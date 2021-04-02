import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";

import './SearchDropdown.scss';

type SearchDropdownProps = {
  isFetchingResults: Boolean,
  searchField: JSX.Element,
  results: JSX.Element[],
  className?: string,
  closeDropdown: () => void,
  isSearchTextEmpty: boolean
};

export default function SearchDropdown(props: SearchDropdownProps) {

  const mainContent = props.isFetchingResults
    ? <p className="message">Loading...</p>
    : props.results.length > 0
      ? <ul className="results">{props.results}</ul>
      : props.isSearchTextEmpty
        ? null
        : <p className="message">Couldn't find those sounds.</p>;

  const className = 'search-dropdown-container ' + (props.className ?? '');
  return (
    <div className={className}>
      {props.searchField}
      {mainContent}
      <DefaultButton
        onClick={props.closeDropdown}
        text="Cancel"
        className="collapse-search-button"
      />
    </div>
  );
}