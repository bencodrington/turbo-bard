import React from "react";
import { SearchResult } from "../../models/SearchResult";
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

  function onSearchItemClick({ name, id }: SearchResult) {
    setSearchText('');
    closeSearchDropdown();
    console.log('adding' + name);
  }

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onSearchItemClick(result)}
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