import React, { useState } from "react";
import { fetchSearchResults } from "../../services/database";
import { useGroups } from "../../slices";
import AddSoundsButton from "../../widgets/buttons/AddSoundsButton";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import useSearchResults from "../SearchDropdown/useSearchResults";

import "./TrackList.scss";
import TrackListGroup from "./TrackListGroup";

export const NEW_GROUP = 'NEW_GROUP';

export default function TrackList() {
  const groups = useGroups();
  const [searchTarget, setSearchTarget] = useState<number | null | typeof NEW_GROUP>(null);
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText
  } = useSearchResults(fetchSearchResults);

  const addButtonText = 'Add sounds' + (groups.length > 0 ? ' to new group' : '');

  return (
    <div className="track-list-container">
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