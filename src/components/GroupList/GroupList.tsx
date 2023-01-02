import React, { useState } from "react";
import AppHeader from "../../widgets/AppHeader";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import addIcon from "../../assets/icon-add.svg";

import './GroupList.scss';
import { useGroups } from "../../slices";
import { useDispatch } from "react-redux";
import { newGroup } from "../../slices/groups";
import { getNextIndex } from "../../utils/storeUtil";
import GroupListItem from "./GroupListItem";

type GroupListProps = {
  openAboutPage: () => void;
};

export default function GroupList({ openAboutPage }: GroupListProps) {
  const groups = useGroups();
  const dispatch = useDispatch();

  const [editableGroupIndex, setEditableGroupIndex] = useState<null | number>(null);
  const editGroup = (index: number) => setEditableGroupIndex(index);
  const stopEditingGroup = () => setEditableGroupIndex(null);

  const createNewGroup = () => {
    const index = getNextIndex(groups);
    dispatch(newGroup({ index }));
    editGroup(index);
  };

  return (
    <div className="group-list-container">
      {/* TODO: <EditableGroup stopEditingGroup={stopEditingGroup} /> */}
      <AppHeader
        isAboutOpen={false}
        setIsAboutOpen={openAboutPage}
      />
      {editableGroupIndex !== null && <h3>{editableGroupIndex}</h3>}
      <main>
        {groups.length === 0 && <h3 className="empty-state-message">No sound groups.</h3>}
        {
          groups.map(group =>
            <GroupListItem
              key={group.index}
              group={group}
            />
          )
        }
        <Button
          text="Create new group"
          type={ButtonType.Primary}
          icon={addIcon}
          iconAltText="Plus icon"
          onClick={createNewGroup}
        />
      </main>
    </div>
  )
}