import React, { useEffect, useState } from "react";
import NewSoundscapeButton from "../../widgets/buttons/NewSoundscapeButton";
import SearchField from "../../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";

import { fetchSoundscapeResults } from "../../services/database";
import SearchItem from "./SearchItem";
import { cloneSoundscape, closeAllSoundscapes, newSoundscape } from "../../slices/soundscapes";
import { useDispatch } from "react-redux";
import useSearchResults from "./useSearchResults";
import { SearchResult } from "../../models/SearchResult";

type SoundscapeSearchDropdownProps = {
  closeSearchDropdown: () => void
};

export default function SoundscapeSearchDropdown({
  closeSearchDropdown
}: SoundscapeSearchDropdownProps) {
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText
  } = useSearchResults(fetchSoundscapeResults);

  const dispatch = useDispatch();

  const onSearchItemClick = ({ name, id }: SearchResult) => {
    setSearchText('');
    dispatch(closeAllSoundscapes());
    dispatch(cloneSoundscape({ name, sourceId: id }));
    closeSearchDropdown();
  };

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onSearchItemClick(result)}
    />
  ));

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
      results={resultElements}
      suggestions={[]}
      isFetchingResults={isFetchingResults}
      trailing={trailing}
    />
  );
}