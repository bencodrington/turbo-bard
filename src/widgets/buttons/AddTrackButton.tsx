import React from "react";
import { useOpenSoundscape } from "../../slices";
import AddButton from "./AddButton";

// import "./AddTrackButton.scss";

type AddTrackButtonProps = {
  onClick: () => void
};

export default function AddTrackButton({ onClick }: AddTrackButtonProps) {
  const openSoundscape = useOpenSoundscape();
  if (openSoundscape === undefined) return null;
  return (
    <AddButton
      text="Add Track"
      onClick={onClick}
      isTrackButton={true}
    />
  );
}