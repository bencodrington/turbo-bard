import React, { useEffect, useState } from "react";

import "./EditIconModal.scss";
import Modal from "../Modal";
import { Group } from "../../models/Group";
import { getIcon, getIconColour } from "../../utils/iconUtil";
import SearchBar from "../SearchBar";
import { searchIcons } from "../../services/fontawesome";

interface EditIconModalProps {
  closeModal: () => void,
  group: Group
}
export default function EditIconModal({ closeModal, group }: EditIconModalProps) {
  const icon = getIcon(group);
  const iconColour = getIconColour(group);
  useEffect(() => {
    searchIcons();
  }, []);

  const [searchText, setSearchText] = useState('');
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
          <SearchBar searchText={searchText} setSearchText={setSearchText} placeholder="Search for icons" />
          <p>array of clickable icons</p>
          <p>array of clickable colours</p>
        </div>
      </Modal>
    </div>
  )
}