import React, { useState } from "react";
import NewSoundscapeButton from "../widgets/buttons/NewSoundscapeButton";
import SearchField from "../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";

export default function SoundscapeSearchDropdown() {
  const [results, setResults] = useState<JSX.Element[]>([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchText, setSearchText] = useState('');

  function onSearchTextUpdated(newText: string) {
    console.log(newText);
    setResults([...results, <li>-{newText}</li>]);
    setSearchText(newText);
  }

  const searchField = (
    <SearchField
      value={searchText}
      onChange={onSearchTextUpdated}
      placeholderText={"'graveyard', 'tavern', ..."}
    />
  );

  return (
    <SearchDropdown
      searchField={searchField}
      results={results}
      suggestions={[]}
      isFetchingResults={isFetchingResults}
      onSearchTextUpdated={onSearchTextUpdated}
      trailing={<NewSoundscapeButton />}
    />
  );
}