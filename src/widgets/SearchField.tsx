import React, { ChangeEvent, useEffect, useRef } from "react";
import searchIcon from "../assets/icon-search.svg";

import "./SearchField.scss";

type SearchFieldProps = {
  value: string,
  onChange: (newText: string) => void,
  placeholderText: string
};

export default function SearchField(props: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Highlight text the search field's text each time it becomes visible.
    //  This also applies when switching between global and per-group
    //  search fields.
    if (inputRef.current === null) return;
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value);
  }

  return (
    <div className="search-field-container">
      <img
        className="icon"
        src={searchIcon}
        alt='Search Icon'
      />
      <input
        type="text"
        placeholder={props.placeholderText}
        value={props.value}
        onChange={changeHandler}
        ref={inputRef}
        role="searchbox"
        autoFocus
      />
    </div>
  );
}