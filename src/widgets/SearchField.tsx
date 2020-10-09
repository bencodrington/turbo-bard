import React, { ChangeEvent } from "react";

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
    <input
      type="text"
      className="search-field-container"
      placeholder={props.placeholderText}
      onChange={changeHandler}
    />
  );
}