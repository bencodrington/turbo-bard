import React, { useEffect, useState } from "react";
import NewSoundscapeButton from "../../widgets/buttons/NewSoundscapeButton";
import SearchField from "../../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";

import { fetchSoundscapeResults } from "../../services/database";
import SoundscapeSearchItem from "./SoundscapeSearchItem";
import { cloneSoundscape, newSoundscape } from "../../slices/soundscapes";
import { useDispatch } from "react-redux";

export default function SoundscapeSearchDropdown() {
  const [results, setResults] = useState<JSX.Element[]>([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    async function fetch() {
      const results = await fetchSoundscapeResults(searchText);
      if (isCancelled) return;

      const onSearchItemClick = (name: string, sourceId: string) => {
        setSearchText('');
        dispatch(cloneSoundscape({name, sourceId}));
      };

      setResults(results
        .map(soundscapeSearchItem => {
          const { id, name } = soundscapeSearchItem;
          return (
            <SoundscapeSearchItem
              key={id}
              data={soundscapeSearchItem}
              onClick={() => onSearchItemClick(name, id)}
            />
          );
        })
      );
      setIsFetchingResults(false);
    }

    setIsFetchingResults(true);
    fetch();

    return () => {
      isCancelled = true;
    }
  }, [searchText, dispatch]);

  const searchField = (
    <SearchField
      value={searchText}
      onChange={setSearchText}
      placeholderText={"'graveyard', 'tavern', ..."}
    />
  );

  const trailing = (
    <NewSoundscapeButton
      onClick={() => dispatch(newSoundscape(searchText))}
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