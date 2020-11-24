import React from "react";
import { useOpenSoundscape } from "../../slices";
import DefaultButton from "./DefaultButton";

// import "./AddTrackButton.scss";

type AddTrackButtonProps = {
  onClick: () => void
};

export default function AddTrackButton({ onClick }: AddTrackButtonProps) {
  const openSoundscape = useOpenSoundscape();
  if (openSoundscape === undefined) return null;
  return (
    <DefaultButton text="Add Track" onClick={onClick} />
  );
}