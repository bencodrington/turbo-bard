import React from "react";
import { useDispatch } from "react-redux";
import { SearchResult } from "../../models/SearchResult";
import { fetchTrackResults } from "../../services/database";
import { useOpenSoundscape } from "../../slices";
import { addSearchResultToOpenSoundscape } from "../../slices/soundscapes";
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
  const isHiddenMobile = useOpenSoundscape() === undefined;
  const dispatch = useDispatch();

  const searchField = (
    <SearchField
      value={searchText}
      onChange={setSearchText}
      placeholderText={"'graveyard', 'tavern', ..."}
    />
  );

  function onSearchItemClick(searchResult: SearchResult) {
    setSearchText('');
    closeSearchDropdown();
    dispatch(addSearchResultToOpenSoundscape(searchResult))
  }

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onSearchItemClick(result)}
    />
  )
  );

  return (
    <SearchDropdown
      className={isHiddenMobile ? 'hidden--mobile' : ''}
      searchField={searchField}
      results={resultElements}
      suggestions={[]}
      isFetchingResults={isFetchingResults}
    />
  );
}