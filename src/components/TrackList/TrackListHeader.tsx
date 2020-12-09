import React from "react";
import { useDispatch } from "react-redux";
import { useOpenSoundscape } from "../../slices";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import { closeAllSoundscapes } from "../../slices/soundscapes";
import backIcon from "../../assets/icon-back.svg";
import editIcon from "../../assets/icon-edit.svg";

import "./TrackListHeader.scss";

type TrackListHeaderProps = {

};

export default function TrackListHeader(props: TrackListHeaderProps) {
  const openSoundscape = useOpenSoundscape();
  const dispatch = useDispatch();
  if (openSoundscape === undefined) return null;
  const { name } = openSoundscape;

  function onBack() {
    dispatch(closeAllSoundscapes());
  }

  function onEditClick() {
    console.log('This feature is not yet implemented.');
  }

  return (
    <div className="track-list-header-container">
      {/* TODO: don't show back button at larger resolutions */}
      <DefaultButton onClick={onBack} icon={backIcon} />
      <h4>{name}</h4>
      <DefaultButton onClick={onEditClick} icon={editIcon} />
    </div>
  );
}