import React from "react";
import AppHeader from "../../widgets/AppHeader";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import addIcon from "../../assets/icon-add.svg";

import './GroupList.scss';
import { useGroups } from "../../slices";

type GroupListProps = {
  openAboutPage: () => void;
};

export default function GroupList({ openAboutPage }: GroupListProps) {
  const groups = useGroups();

  return (
    <div className="group-list-container">
      {/* TODO: if a group is open, display it overtop */}
      <AppHeader
        isAboutOpen={false}
        setIsAboutOpen={openAboutPage}
      />
      <main>
        {groups.length === 0 && <h3 className="empty-state-message">No sound groups.</h3>}
        <Button
          text="Create new group"
          type={ButtonType.Primary}
          icon={addIcon}
          iconAltText="Plus icon"
          onClick={() => { }}
        />
      </main>
    </div>
  )
}