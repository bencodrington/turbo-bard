import React, { useEffect, useState } from "react";
import NewSoundscapeButton from "../../widgets/buttons/NewSoundscapeButton";
import SearchField from "../../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";

import { fetchSoundscapeResults } from "../../services/database";
import SearchItem from "./SearchItem";
import { cloneSoundscape, closeAllSoundscapes, newSoundscape } from "../../slices/soundscapes";
import { useDispatch } from "react-redux";

type SoundscapeSearchDropdownProps = {
  closeSearchDropdown: () => void
};

export default function SoundscapeSearchDropdown({
  closeSearchDropdown
}: SoundscapeSearchDropdownProps) {
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
        dispatch(closeAllSoundscapes());
        dispatch(cloneSoundscape({ name, sourceId }));
        closeSearchDropdown();
      };

      setResults(results
        .map(searchItem => {
          const { id, name } = searchItem;
          return (
            <SearchItem
              key={id}
              data={searchItem}
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
  }, [searchText, dispatch, closeSearchDropdown]);

  const searchField = (
    <SearchField
      value={searchText}
      onChange={setSearchText}
      placeholderText={"'graveyard', 'tavern', ..."}
    />
  );

  const onNewSoundscapeClicked = () => {
    dispatch(closeAllSoundscapes());
    dispatch(newSoundscape(searchText));
    setSearchText('');
    closeSearchDropdown();
  };

  const trailing = (
    <NewSoundscapeButton
      onClick={onNewSoundscapeClicked}
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