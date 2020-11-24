import React from "react";
import { fetchTrackResults } from "../../services/database";
import SearchField from "../../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";
import SearchItem from "./SearchItem";
import useSearchResults from "./useSearchResults";

type TrackSearchDropdownProps = {
  closeSearchDropdown: () => void
};

export default function TrackSearchDropdown({
  closeSearchDropdown
}: TrackSearchDropdownProps) {
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText
  } = useSearchResults(fetchTrackResults);

  const searchField = (
    <SearchField
      value={searchText}
      onChange={setSearchText}
      placeholderText={"'graveyard', 'tavern', ..."}
    />
  );

  function onSearchItemClick(name: string, id: string) {
    setSearchText('');
    closeSearchDropdown();
    console.log('adding' + name);
  }

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onSearchItemClick(result.name, result.id)}
    />
  )
  )

  return (
    <SearchDropdown
      searchField={searchField}
      results={resultElements}
      suggestions={[]}
      isFetchingResults={isFetchingResults}
    />
  );
}