import React from "react";

import "./SearchBar.scss";

interface SearchBarProps {
  placeholder: string;
  searchText: string;
  setSearchText: (newValue: string) => void;
}

export default function SearchBar({ placeholder, searchText, setSearchText }: SearchBarProps) {
  return (
    <div className="search-bar-container">
      <i className="fa-solid fa-magnifying-glass" />
      <input
        type='text'
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />

    </div>
  )
}