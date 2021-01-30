import React, { ChangeEvent } from "react";
import searchIcon from "../assets/icon-search.svg";

import "./SearchField.scss";

type SearchFieldProps = {
  value: string,
  onChange: (newText: string) => void,
  placeholderText: string
};

export default function SearchField(props: SearchFieldProps) {

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
        role="searchbox"
      />
    </div>
  );
}