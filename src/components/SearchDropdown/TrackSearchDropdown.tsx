import React from "react";
import { useDispatch } from "react-redux";
import { SearchResult } from "../../models/SearchResult";
import { addSearchResultToGroup } from "../../slices/soundscapes";
import SearchField from "../../widgets/SearchField";
import SearchDropdown from "./SearchDropdown";
import SearchItem from "./SearchItem";
import { NEW_GROUP } from "../TrackList/TrackList";

type TrackSearchDropdownProps = {
  closeSearchDropdown: () => void,
  searchText: string,
  setSearchText: (newSearchText: string) => void,
  isFetchingResults: boolean,
  results: SearchResult[],
  searchTarget: number | null | typeof NEW_GROUP;
};

export default function TrackSearchDropdown({
  closeSearchDropdown,
  searchText,
  setSearchText,
  isFetchingResults,
  results,
  searchTarget
}: TrackSearchDropdownProps) {
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
    let groupIndex: undefined | number = undefined;
    if (typeof searchTarget === 'number') {
      groupIndex = searchTarget;
    }
    dispatch(addSearchResultToGroup({ searchResult, groupIndex }));
  }

  const resultElements = results.map(result => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onSearchItemClick(result)}
    />
  ));

  return (
    <SearchDropdown
      searchField={searchField}
      results={resultElements}
      isFetchingResults={isFetchingResults}
    />
  );
}