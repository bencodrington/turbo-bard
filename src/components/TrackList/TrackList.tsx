import React, { useState } from "react";
import { useGroups } from "../../slices";
import AppHeader from "../../widgets/AppHeader";
import AddSoundsButton from "../../widgets/buttons/AddSoundsButton";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import useSearchResults from "../SearchDropdown/useSearchResults";

import "./TrackList.scss";
import TrackListGroup from "./TrackListGroup";

export const NEW_GROUP = 'NEW_GROUP';

type TrackListProps = {
  openAboutPage: () => void;
};

export default function TrackList({ openAboutPage }: TrackListProps) {
  const groups = useGroups();
  const [searchTarget, setSearchTarget] = useState<number | null | typeof NEW_GROUP>(null);
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText
  } = useSearchResults();

  const addButtonText = 'Add sounds' + (groups.length > 0 ? ' to new group' : '');

  return (
    <div className="track-list-container">
      <AppHeader
        isAboutOpen={false}
        setIsAboutOpen={openAboutPage}
      />
      {
        searchTarget === NEW_GROUP
          ? <SearchDropdown
            closeSearchDropdown={() => { setSearchTarget(null) }}
            searchText={searchText}
            setSearchText={setSearchText}
            appendSearchText={appendSearchText}
            isFetchingResults={isFetchingResults}
            results={results}
            searchTarget={searchTarget}
          />
          : <AddSoundsButton
            onClick={() => setSearchTarget(NEW_GROUP)}
            text={addButtonText}
          />
      }
      {
        groups.map(group =>
          <TrackListGroup
            key={group.index}
            group={group}
            searchTarget={searchTarget}
            setSearchTarget={setSearchTarget}
            results={results}
            isFetchingResults={isFetchingResults}
            searchText={searchText}
            setSearchText={setSearchText}
            appendSearchText={appendSearchText}
          />
        )
      }
    </div>
  );
}