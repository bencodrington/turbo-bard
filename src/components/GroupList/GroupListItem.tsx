import React from "react";
import { Group } from "../../models/Group";

import "./shared-group-list-styles.scss";
import "./GroupListItem.scss";
import PlayGroupButton from "../../widgets/buttons/PlayGroupButton";
import { getIcon, getIconColour } from "../../utils/iconUtil";

type GroupListItemProps = {
  group: Group;
  editGroup: (groupIndex: number) => void;
  isBeingEdited: boolean;
};

export default function GroupListItem({
  group,
  editGroup,
  isBeingEdited,
}: GroupListItemProps) {
  return (
    <div
      className={`group-list-item-container ${
        isBeingEdited ? "is-being-edited" : ""
      }`}
      onClick={() => {
        editGroup(group.index);
      }}
    >
      <div className="labelled-group-name">
        <i
          className={`${getIcon(group)} group-list-item-icon`}
          style={{ color: getIconColour(group) }}
        />
        <p>{group.name}</p>
      </div>
      <div className="buttons">
        <PlayGroupButton group={group} />
        <i className="fa fa-angle-right" />
      </div>
    </div>
  );
}
