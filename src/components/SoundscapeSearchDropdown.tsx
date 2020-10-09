import React, { useEffect, useState } from "react";
import { Soundscape } from "../models/Soundscape";
import NewSoundscapeButton from "../widgets/buttons/NewSoundscapeButton";
import SearchField from "../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";

type SoundscapeSearchDropdownProps = {
  addSoundscape: (soundscape: Soundscape) => void
};

export default function SoundscapeSearchDropdown({addSoundscape}: SoundscapeSearchDropdownProps) {
  const [results, setResults] = useState<JSX.Element[]>([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {

    let request: NodeJS.Timeout;
    
    async function fetchSoundscapes() {
      // TODO: replace with actual fetch
      const results: string[] = await new Promise((resolve) => {
        request = setTimeout(() => {
          resolve([`results for "${searchText}": ` + Math.random()]);
        }, 1000);
      });
      setResults(results.map(result => <li key={result}>{result}</li>));
      setIsFetchingResults(false);
    }

    setIsFetchingResults(true);
    fetchSoundscapes();
    return () => {
      clearTimeout(request);
    }
  }, [searchText]);

  const searchField = (
    <SearchField
      value={searchText}
      onChange={setSearchText}
      placeholderText={"'graveyard', 'tavern', ..."}
    />
  );

  const trailing = (
    <NewSoundscapeButton
      onClick={() => addSoundscape({name: searchText, tracks: []})}
    />
  )

  return (
    <SearchDropdown
      searchField={searchField}
      results={results}
      suggestions={[]}
      isFetchingResults={isFetchingResults}
      trailing={trailing}
    />
  );
}