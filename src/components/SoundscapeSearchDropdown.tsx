import React, { useState } from "react";
import NewSoundscapeButton from "../widgets/buttons/NewSoundscapeButton";
import SearchDropdown from "./SearchDropdown";

export default function SoundscapeSearchDropdown() {
  const [results, setResults] = useState([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);

  function onSearchTextUpdated(newText: String) {
    console.log(newText);
  }

  return (
    <SearchDropdown
      results={results}
      suggestions={[]}
      isFetchingResults={isFetchingResults}
      onSearchTextUpdated={onSearchTextUpdated}
      trailing={<NewSoundscapeButton />}
    />
  );
}