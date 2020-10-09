import React from "react";

type SearchDropdownProps = {
  isFetchingResults: Boolean,
  onSearchTextUpdated: (newText: String) => void,
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
  return (
    <div className="search-dropdown-container">
      Search Dropdown
      {/* TODO: search bar */}
      {/* TODO: suggestions */}
      {/* TODO: results */}
      {trailing}
    </div>
  );
}