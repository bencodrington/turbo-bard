import React from "react";

import "./SearchResults.scss";
import Button from "../../widgets/buttons/Button";
import { SearchResult } from "../../models/SearchResult";
import SearchItem from "../SearchDropdown/SearchItem";
import TabSwitcher, { Tab } from "../TabSwitcher";
import { SearchResultType } from "../../models/SearchResultType";
import useBoolean from "../../hooks/useBoolean";
import Toggle from "../../widgets/Toggle";
import SearchBar from "../SearchBar";
import { doesGroupContainSearchResult } from "../../utils/groupUtil";

interface SearchResultsProps {
  onAddSearchResult: (
    result: SearchResult,
    shouldAddToCombatSection: boolean
  ) => void;
  onCloseSearch: () => void;
  targetGroupName: string;
  searchText: string;
  setSearchText: (newValue: string) => void;
  searchResultType: SearchResultType;
  setSearchResultType: (newValue: SearchResultType) => void;
  isFetchingResults: boolean;
  results: SearchResult[];
  targetGroupId: number;
  soundsInGroup: string[];
}

const TABS: Tab[] = [
  {
    id: SearchResultType.Everything,
    displayName: "Everything",
    icon: "magnifying-glass",
  },
  {
    id: SearchResultType.Music,
    displayName: "Music",
    icon: "music",
  },
  {
    id: SearchResultType.Ambiance,
    displayName: "Ambiance",
    icon: "cloud-sun-rain",
  },
];

export default function SearchResults({
  onAddSearchResult,
  onCloseSearch,
  targetGroupName,
  searchText,
  setSearchText,
  searchResultType,
  setSearchResultType,
  isFetchingResults,
  results,
  targetGroupId,
  soundsInGroup,
}: SearchResultsProps) {
  const [isAddingToCombatSection, , toggleIsAddingToCombatSection] =
    useBoolean(false);

  const resultElements = results.map((result) => (
    <SearchItem
      key={result.id}
      data={result}
      onClick={() => onAddSearchResult(result, isAddingToCombatSection)}
      isAlreadyAdded={doesGroupContainSearchResult(soundsInGroup, result)}
    />
  ));

  const mainContent = isFetchingResults ? (
    <div className="spinner">
      <i className="fa-solid fa-circle-notch fa-spin" />
    </div>
  ) : resultElements.length > 0 ? (
    <ul className="results">{resultElements}</ul>
  ) : searchText.length === 0 ? null : (
    <p className="message">Couldn't find those sounds.</p>
  );

  return (
    <div className="search-results-container">
      <header>
        <div className="title-row">
          <Button icon="arrow-left" onClick={onCloseSearch} />
          <span>
            Adding to{" "}
            <span className="target-group-name">{targetGroupName}</span>
          </span>
          <Toggle
            id="combat-toggle"
            label="Add to Combat"
            isChecked={isAddingToCombatSection}
            onToggle={toggleIsAddingToCombatSection}
            icon="hand-fist"
          />
        </div>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          placeholder="Search all sounds"
        />
        <TabSwitcher
          selectedTabId={searchResultType}
          tabs={TABS}
          onTabClick={(newTabId) =>
            setSearchResultType(newTabId as SearchResultType)
          }
        />
      </header>
      {mainContent}
    </div>
  );
}
