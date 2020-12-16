import React from "react";
import { useDispatch } from "react-redux";
import { SearchResult } from "../../models/SearchResult";
import { fetchTrackResults } from "../../services/database";
import { useOpenSoundscape } from "../../slices";
import { addSearchResultToOpenSoundscape } from "../../slices/soundscapes";
import SearchField from "../../widgets/SearchField";
import Tag from "../../widgets/Tag";
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
  ));

  const suggestions = [
    <Tag
      key="loop-suggestion"
      text="loop"
      onClick={() => setSearchText(searchText + ' loop')}
    />,
    <Tag
      key="one-shot-suggestion"
      text="one-shot"
      onClick={() => setSearchText(searchText + ' one-shot')}
    />
  ]

  return (
    <SearchDropdown
      className={isHiddenMobile ? 'hidden--mobile' : ''}
      searchField={searchField}
      results={resultElements}
      suggestions={suggestions}
      isFetchingResults={isFetchingResults}
    />
  );
}