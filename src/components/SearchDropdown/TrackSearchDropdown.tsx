import React from "react";
import { useDispatch } from "react-redux";
import { SearchResult } from "../../models/SearchResult";
import { useOpenSoundscape } from "../../slices";
import { addSearchResultToGroup } from "../../slices/soundscapes";
import SearchField from "../../widgets/SearchField";
import TagList from "../TagList";
import SearchDropdown from "./SearchDropdown";
import SearchItem from "./SearchItem";

type TrackSearchDropdownProps = {
  closeSearchDropdown: () => void,
  searchText: string,
  setSearchText: (newSearchText: string) => void,
  appendSearchText: (newSearchText: string) => void,
  isFetchingResults: boolean,
  results: SearchResult[]
};

export default function TrackSearchDropdown({
  closeSearchDropdown,
  searchText,
  setSearchText,
  appendSearchText,
  isFetchingResults,
  results
}: TrackSearchDropdownProps) {
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
    closeSearchDropdown();
    dispatch(addSearchResultToGroup({ searchResult }))
  }

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onSearchItemClick(result)}
    />
  ));

  const suggestions = (
    <TagList tags={['loop', 'one-shot']} onTagClick={appendSearchText} />
  );

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