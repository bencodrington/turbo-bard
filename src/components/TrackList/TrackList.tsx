import React, { useState } from "react";
import { fetchSearchResults } from "../../services/database";
import { useSoundscapes } from "../../slices";
import AddSoundsButton from "../../widgets/buttons/AddSoundsButton";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import useSearchResults from "../SearchDropdown/useSearchResults";

import "./TrackList.scss";
import Group from "./TrackListGroup";

export const NEW_GROUP = 'NEW_GROUP';

export default function TrackList() {
  const groups = useSoundscapes();
  const [searchTarget, setSearchTarget] = useState<number | null | typeof NEW_GROUP>(null);
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText
  } = useSearchResults(fetchSearchResults);

  return (
    <div className="track-list-container">
      {
        searchTarget === NEW_GROUP
          ? <TrackSearchDropdown
            closeSearchDropdown={() => { setSearchTarget(null) }}
            searchText={searchText}
            setSearchText={setSearchText}
            isFetchingResults={isFetchingResults}
            results={results}
            searchTarget={searchTarget}
          />
          : <AddSoundsButton onClick={() => setSearchTarget(NEW_GROUP)} />
      }
      {
        groups.map(group =>
          <Group
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