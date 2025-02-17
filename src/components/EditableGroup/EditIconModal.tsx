import React, { useEffect, useState } from "react";

import "./EditIconModal.scss";
import Modal from "../Modal";
import { Group } from "../../models/Group";
import {
  DEFAULT_ICON_OPTIONS,
  getIcon,
  getIconColour,
  getIconClassStringFromIconId,
  ICON_COLOUR_OPTIONS,
} from "../../utils/iconUtil";
import SearchBar from "../SearchBar";
import {
  MAX_ICON_SEARCH_RESULT_COUNT,
  searchIcons,
} from "../../services/fontawesome";
import Button from "../../widgets/buttons/Button";
import { useDispatch } from "react-redux";
import { setGroupIcon, setGroupIconColour } from "../../slices/groups";

interface EditIconModalProps {
  closeModal: () => void;
  group: Group;
}
export default function EditIconModal({
  closeModal,
  group,
}: EditIconModalProps) {
  const icon = getIcon(group);
  const iconColour = getIconColour(group);

  const [searchText, setSearchText] = useState("");
  const [iconSearchResults, setIconSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchText.length === 0) {
      // Show several default icons before the user searches for anything.
      setIconSearchResults(DEFAULT_ICON_OPTIONS);
      return;
    }
    async function fetchIconSearchResults() {
      setIsLoading(true);
      const results = await searchIcons(searchText);
      if (!shouldIgnoreResults) {
        setIsLoading(false);
        setIconSearchResults(results);
      }
    }
    let shouldIgnoreResults = false;
    fetchIconSearchResults();
    // If the effect fires again before the results are returned, we should ignore them.
    return () => {
      shouldIgnoreResults = true;
    };
  }, [searchText]);

  const dispatch = useDispatch();
  const updateGroupIcon = (newIcon: string) => {
    dispatch(setGroupIcon({ groupIndex: group.index, icon: newIcon }));
  };
  const updateGroupIconColour = (newIconColour: string) => {
    dispatch(
      setGroupIconColour({ groupIndex: group.index, iconColour: newIconColour })
    );
  };

  const wereNoResultsFound =
    iconSearchResults.length === 0 && searchText.length !== 0;

  const gridContent = wereNoResultsFound ? (
    <p className="empty-state-message">No results found for "{searchText}".</p>
  ) : isLoading ? (
    [...Array(MAX_ICON_SEARCH_RESULT_COUNT)].map((index) => (
      <i className="loading-spinner fa fa-spinner fa-spin" key={index} />
    ))
  ) : (
    iconSearchResults.map((iconId) => (
      <Button
        onClick={() => updateGroupIcon(iconId)}
        icon={iconId}
        key={iconId}
        secondaryIcon={
          getIconClassStringFromIconId(iconId) === icon ? "check" : undefined
        }
        // var(--primary)
        secondaryIconColour="#0078CE"
      />
    ))
  );

  return (
    <div className="edit-icon-modal-container">
      <Modal
        title="Select an icon"
        subtitle={group.name}
        icon={icon}
        iconColour={iconColour}
        onClose={closeModal}
      >
        <div className="edit-icon-modal-content">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            placeholder="Search for icons"
          />
          <div className={wereNoResultsFound ? "empty-state" : "icon-grid"}>
            {gridContent}
          </div>
          <div className="colour-options">
            {ICON_COLOUR_OPTIONS.map((hexCode) => (
              <Button
                onClick={() => updateGroupIconColour(hexCode)}
                icon="fa fa-solid fa-circle"
                iconColour={hexCode}
                key={hexCode}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
