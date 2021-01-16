import React from "react";
import useBoolean from "../../hooks/useBoolean";
import { fetchTrackResults } from "../../services/database";
import { useSoundscapes } from "../../slices";
import AddSoundsButton from "../../widgets/buttons/AddSoundsButton";
import TrackSearchDropdown from "../SearchDropdown/TrackSearchDropdown";
import useSearchResults from "../SearchDropdown/useSearchResults";

import "./TrackList.scss";
import Group from "./Group";

export default function TrackList() {
  const soundscapes = useSoundscapes();
  const [
    isSearchOpen,
    setIsSearchOpen,
    toggleIsSearchOpen
  ] = useBoolean(false);
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText
  } = useSearchResults(fetchTrackResults);

  return (
    <div className="track-list-container">
      {isSearchOpen
        ? <TrackSearchDropdown
          closeSearchDropdown={() => { setIsSearchOpen(false) }}
          searchText={searchText}
          setSearchText={setSearchText}
          appendSearchText={appendSearchText}
          isFetchingResults={isFetchingResults}
          results={results}
        />
        : <AddSoundsButton onClick={toggleIsSearchOpen} />
      }
      {
        soundscapes.map(group =>
          <Group
            key={group.index}
            group={group}
            isSearchModeActive={isSearchOpen}
            isThisGroupSearching={false} // TODO: add search to each group
          />
        )
      }
    </div>
  );
}