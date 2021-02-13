import React from "react";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import caretUpIcon from "../../assets/icon-caret-up.svg";

import './SearchDropdown.scss';

type SearchDropdownProps = {
  isFetchingResults: Boolean,
  searchField: JSX.Element,
  results: JSX.Element[],
  suggestions?: JSX.Element,
  className?: string,
  closeDropdown: () => void
};

export default function SearchDropdown(props: SearchDropdownProps) {

  const results = props.isFetchingResults
    ? <p className="results">Loading...</p>
    : <ul className="results">{props.results}</ul>;

  const className = 'search-dropdown-container ' + (props.className ?? '');
  return (
    <div className={className}>
      {props.searchField}
      {props.suggestions}
      {results}
      <DefaultButton
        onClick={props.closeDropdown}
        icon={caretUpIcon}
        iconAltText="TODO:"
        className="collapse-search-button"
      />
    </div>
  );
}