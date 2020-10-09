import React, { useEffect, useState } from "react";
import { Soundscape } from "../../models/Soundscape";
import NewSoundscapeButton from "../../widgets/buttons/NewSoundscapeButton";
import SearchField from "../../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";

import { fetchSoundscapes } from "../../services/database";
import SoundscapeSearchItem from "./SoundscapeSearchItem";

type SoundscapeSearchDropdownProps = {
  addSoundscape: (soundscape: Soundscape) => void,
  nextId: string
};

export default function SoundscapeSearchDropdown({ addSoundscape, nextId }: SoundscapeSearchDropdownProps) {
  const [results, setResults] = useState<JSX.Element[]>([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let isCancelled = false;
    async function fetch() {
      const results = await fetchSoundscapes(searchText);
      if (isCancelled) return;
      setResults(results
        .map(soundscape => (
          <SoundscapeSearchItem
            key={soundscape.id}
            data={soundscape}
            onClick={() => addSoundscape(soundscape)}
          />
        ))
      );
      setIsFetchingResults(false);
    }

    setIsFetchingResults(true);
    fetch();

    return () => {
      isCancelled = true;
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
      onClick={() => addSoundscape({ id: nextId, name: searchText, tracks: [] })}
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