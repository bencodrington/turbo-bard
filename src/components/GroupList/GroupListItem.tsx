import React from "react";
import { Group } from "../../models/Group";
import { Track } from "../../models/Track";
import Button from "../../widgets/buttons/Button";
import playIcon from "../../assets/icon-play.svg";
import caretDownIcon from "../../assets/icon-caret-down.svg";
// import stopIcon from "../../assets/icon-stop.svg";

import "./GroupListItem.scss";

type GroupListItemProps = {
  group: Group,
  editGroup: (groupIndex: number) => void
};

const computeSoundDisplayString = (tracks: Track[]) => {
  if (tracks.length === 0) return 'No sounds.';
  return (
    'Sounds: ' +
    tracks.map(track => track.name ?? '...').join(', ') +
    '.'
  );
}

export default function GroupListItem({ group, editGroup }: GroupListItemProps) {

  const soundsDisplayString = computeSoundDisplayString(group.tracks);

  const playSolo = () => { };
  const toggleDropdown = () => { };

  return (
    <div className="group-list-item-container">
      <header>
        <h2>{group.name}</h2>
        <Button onClick={() => { editGroup(group.index) }} text="Edit" />
      </header>
      <p className="sound-display-text">{soundsDisplayString}</p>
      <div className="buttons">
        <Button
          text="Play solo"
          icon={playIcon}
          iconAltText="Play icon"
          onClick={playSolo}
        />
        <Button
          icon={caretDownIcon}
          iconAltText="Caret pointing downward"
          onClick={toggleDropdown}
        />
      </div>
    </div>
  );
}