import React, { useState } from "react";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import {
  addSearchResult,
  removeGroup,
  setGroupName,
} from "../../slices/groups";
import "./EditableGroup.scss";
import { useDispatch } from "react-redux";
import { Group } from "../../models/Group";
import useBoolean from "../../hooks/useBoolean";
import useSearchResults from "../SearchDropdown/useSearchResults";
import { constructKey } from "../../utils/tsxUtil";
import SoundItem from "./SoundItem";
import SectionHeader from "../SectionHeader";
import EmptySection from "./EmptySection";
import SearchResults from "./SearchResults";
import PlayGroupButton from "../../widgets/buttons/PlayGroupButton";
import SourceModal from "./SourceModal";
import { findTrackInGroup } from "../../utils/groupUtil";
import EditIconModal from "./EditIconModal";
import { getIcon, getIconColour } from "../../utils/iconUtil";
import AdjustTimingModal from "./AdjustTimingModal";
import { isOneShot } from "../../models/Track";
import { isTrackAmbiance, isTrackMusic } from "../../utils/trackUtil";

type EditableGroupProps = {
  className?: string;
  group: Group;
  stopEditingGroup: () => void;
};

export default function EditableGroup({
  className,
  group,
  stopEditingGroup,
}: EditableGroupProps) {
  const dispatch = useDispatch();
  const deleteGroup = () => {
    stopEditingGroup();
    dispatch(removeGroup({ groupIndex: group.index }));
  };

  const updateGroupName = (newName: string) => {
    dispatch(setGroupName({ groupIndex: group.index, name: newName }));
  };

  const [isSearchOpen, setIsSearchOpen] = useBoolean(false);
  const {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    // appendSearchText,
    searchResultType,
    setSearchResultType,
  } = useSearchResults();

  const musicTracks = group.tracks.filter(isTrackMusic);
  const ambianceTracks = group.tracks.filter(isTrackAmbiance);
  const combatMusicTracks = group.combatTracks.filter(isTrackMusic);
  const combatAmbianceTracks = group.combatTracks.filter(isTrackAmbiance);

  const [trackWithOpenMenu, setTrackWithOpenMenu] = useState<number | null>(
    null
  );
  const toggleTrackWithOpenMenu = (trackId: number) => {
    if (trackWithOpenMenu === trackId) {
      // Close menu
      setTrackWithOpenMenu(null);
    } else {
      // Switch open menu to the new track
      setTrackWithOpenMenu(trackId);
    }
  };

  const [indexOfTrackWithSourceModalOpen, setIndexOfTrackWithSourceModalOpen] =
    useState<number | null>(null);
  const trackWithSourceModalOpen =
    indexOfTrackWithSourceModalOpen === null
      ? null
      : findTrackInGroup(indexOfTrackWithSourceModalOpen, group) ?? null;

  const [
    indexOfTrackWithAdjustTimingModalOpen,
    setIndexOfTrackWithAdjustTimingModalOpen,
  ] = useState<number | null>(null);
  const trackWithAdjustTimingModalOpen =
    indexOfTrackWithAdjustTimingModalOpen === null
      ? null
      : findTrackInGroup(indexOfTrackWithAdjustTimingModalOpen, group) ?? null;
  const oneShotWithAdjustTimingModalOpen =
    trackWithAdjustTimingModalOpen !== null &&
    isOneShot(trackWithAdjustTimingModalOpen)
      ? trackWithAdjustTimingModalOpen
      : null;

  const [isEditingIcon, setIsEditingIcon] = useState(false);

  return (
    <div
      className={`${className ? className + " " : ""} editable-group-container`}
    >
      {isSearchOpen && (
        <SearchResults
          onAddSearchResult={(result, shouldAddToCombatSection) =>
            dispatch(
              addSearchResult({
                searchResult: result,
                groupIndex: group.index,
                shouldAddToCombatSection,
              })
            )
          }
          onCloseSearch={() => {
            setIsSearchOpen(false);
          }}
          targetGroupName={group.name}
          searchText={searchText}
          setSearchText={setSearchText}
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
          isFetchingResults={isFetchingResults}
          results={results}
          targetGroupId={group.index}
          soundsInGroup={[
            ...group.tracks.map((track) => track.id),
            ...group.combatTracks.map((track) => track.id),
          ]}
        />
      )}

      {isEditingIcon && (
        <EditIconModal
          closeModal={() => setIsEditingIcon(false)}
          group={group}
        />
      )}

      {trackWithSourceModalOpen !== null && (
        <SourceModal
          closeModal={() => {
            setIndexOfTrackWithSourceModalOpen(null);
          }}
          track={trackWithSourceModalOpen}
        />
      )}

      {oneShotWithAdjustTimingModalOpen !== null && (
        <AdjustTimingModal
          closeModal={() => {
            setIndexOfTrackWithAdjustTimingModalOpen(null);
          }}
          oneShot={oneShotWithAdjustTimingModalOpen}
          oneShotTrackId={constructKey(group, oneShotWithAdjustTimingModalOpen)}
          groupIndex={group.index}
        />
      )}

      <header>
        <div className="header-button-group">
          <Button icon="arrow-left" onClick={stopEditingGroup} />
          <Button icon="trash" onClick={deleteGroup} />
        </div>
        <div className="header-button-group">
          <Button
            icon={getIcon(group)}
            iconColour={getIconColour(group)}
            secondaryIcon="pencil"
            onClick={() => setIsEditingIcon(true)}
          />
          <input
            type="text"
            value={group.name}
            onChange={(e) => updateGroupName(e.target.value)}
          />
          <PlayGroupButton group={group} />
        </div>
      </header>

      <main>
        <section>
          <SectionHeader icon="music" text="Music" hasExtraMargin={true} />
          <div className="horizontal-padding">
            {musicTracks.map((track) => (
              <SoundItem
                key={constructKey(group, track)}
                track={track}
                groupIndex={group.index}
                trackInstanceId={constructKey(group, track)}
                isMenuOpen={trackWithOpenMenu === track.index}
                toggleMenuOpen={() => toggleTrackWithOpenMenu(track.index)}
                showSource={() =>
                  setIndexOfTrackWithSourceModalOpen(track.index)
                }
                showAdjustTimingModal={() =>
                  setIndexOfTrackWithAdjustTimingModalOpen(track.index)
                }
              />
            ))}
            {musicTracks.length === 0 && <EmptySection />}
          </div>
        </section>
        <section>
          <SectionHeader
            icon="cloud-sun-rain"
            text="Ambiance"
            hasExtraMargin={true}
          />
          <div className="horizontal-padding">
            {ambianceTracks.map((track) => (
              <SoundItem
                key={constructKey(group, track)}
                track={track}
                groupIndex={group.index}
                trackInstanceId={constructKey(group, track)}
                isMenuOpen={trackWithOpenMenu === track.index}
                toggleMenuOpen={() => toggleTrackWithOpenMenu(track.index)}
                showSource={() =>
                  setIndexOfTrackWithSourceModalOpen(track.index)
                }
                showAdjustTimingModal={() =>
                  setIndexOfTrackWithAdjustTimingModalOpen(track.index)
                }
              />
            ))}
            {ambianceTracks.length === 0 && <EmptySection isLarge />}
          </div>
        </section>
        <section className="combat-section-header">
          <div className="combat-section-divider">
            <i className="fa-solid fa-hand-fist" />
            <h3>Combat</h3>
          </div>
          <div className="horizontal-padding">
            <p>
              Sounds in this section
              <strong> replace the music </strong>
              and
              <strong> add to the ambiance </strong>
              during Combat.
            </p>
          </div>
        </section>
        <section>
          <SectionHeader icon="music" text="Music" hasExtraMargin={true} />
          <div className="horizontal-padding">
            {combatMusicTracks.map((track) => (
              <SoundItem
                key={constructKey(group, track)}
                track={track}
                groupIndex={group.index}
                trackInstanceId={constructKey(group, track)}
                isMenuOpen={trackWithOpenMenu === track.index}
                toggleMenuOpen={() => toggleTrackWithOpenMenu(track.index)}
                showSource={() =>
                  setIndexOfTrackWithSourceModalOpen(track.index)
                }
                showAdjustTimingModal={() =>
                  setIndexOfTrackWithAdjustTimingModalOpen(track.index)
                }
              />
            ))}
            {combatMusicTracks.length === 0 && <EmptySection />}
          </div>
        </section>
        <section>
          <SectionHeader
            icon="cloud-sun-rain"
            text="Ambiance"
            hasExtraMargin={true}
          />
          <div className="horizontal-padding">
            {combatAmbianceTracks.map((track) => (
              <SoundItem
                key={constructKey(group, track)}
                track={track}
                groupIndex={group.index}
                trackInstanceId={constructKey(group, track)}
                isMenuOpen={trackWithOpenMenu === track.index}
                toggleMenuOpen={() => toggleTrackWithOpenMenu(track.index)}
                showSource={() =>
                  setIndexOfTrackWithSourceModalOpen(track.index)
                }
                showAdjustTimingModal={() =>
                  setIndexOfTrackWithAdjustTimingModalOpen(track.index)
                }
              />
            ))}
            {combatAmbianceTracks.length === 0 && <EmptySection isLarge />}
          </div>
        </section>
      </main>
      <div className="floating-button-group">
        <Button
          text="Add sounds to environment"
          type={ButtonType.Primary}
          icon="plus"
          onClick={() => setIsSearchOpen(true)}
        />
      </div>
    </div>
  );
}
