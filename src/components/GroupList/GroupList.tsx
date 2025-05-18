import React, { useState } from "react";
import AppHeader from "../../widgets/AppHeader";
import Button, { ButtonType } from "../../widgets/buttons/Button";

import "./GroupList.scss";
import { useGroups } from "../../slices";
import { useDispatch } from "react-redux";
import { newGroup } from "../../slices/groups";
import { getNextIndex } from "../../utils/storeUtil";
import GroupListItem from "./GroupListItem";
import EditableGroup from "../EditableGroup/EditableGroup";
import SectionHeader from "../SectionHeader";
import GroupListEmptyState from "./GroupListEmptyState";

type GroupListProps = {
  openAboutPage: () => void;
};

export default function GroupList({ openAboutPage }: GroupListProps) {
  const groups = useGroups();
  const dispatch = useDispatch();

  const [editableGroupIndex, setEditableGroupIndex] = useState<null | number>(
    null
  );
  const editableGroup =
    groups.find((group) => group.index === editableGroupIndex) ?? null;
  const editGroup = (index: number) => setEditableGroupIndex(index);
  const stopEditingGroup = () => setEditableGroupIndex(null);

  const createNewGroup = () => {
    const index = getNextIndex(groups);
    dispatch(newGroup({ index }));
    editGroup(index);
  };

  return (
    <div className="group-list-container">
      <AppHeader isAboutOpen={false} setIsAboutOpen={openAboutPage} />
      <main>
        <div className="group-list-column">
          <div className="group-list">
            {groups.length === 0 && (
              <GroupListEmptyState createNewGroup={createNewGroup} />
            )}
            {groups.length !== 0 && (
              <SectionHeader icon="mountain-sun" text="Environments" />
            )}
            {groups.map((group) => (
              <GroupListItem
                key={group.index}
                group={group}
                editGroup={editGroup}
                isBeingEdited={group.index === editableGroup?.index}
              />
            ))}
          </div>
          {groups.length !== 0 && (
            <div className="floating-button-group">
              <Button
                text="Add environment"
                type={ButtonType.Primary}
                icon="plus"
                onClick={createNewGroup}
              />
            </div>
          )}
        </div>

        {editableGroup !== null && (
          <EditableGroup
            className="editable-group"
            stopEditingGroup={stopEditingGroup}
            group={editableGroup}
          />
        )}
      </main>
    </div>
  );
}
