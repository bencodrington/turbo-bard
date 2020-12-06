import React from "react";
import { useDispatch } from "react-redux";
import useClonedTrackIds from "../../hooks/useClonedTrackIds";
import { Soundscape } from "../../models/Soundscape";
import { isLoop, isOneShot } from "../../models/Track";
import { openSoundscape } from "../../slices/soundscapes";
import DefaultButton from "../../widgets/buttons/DefaultButton";

import "./SoundscapeListItem.scss";

type SoundscapeListItemProps = {
  soundscape: Soundscape
};

export default function SoundscapeListItem({ soundscape }: SoundscapeListItemProps) {
  const { sourceId, name, tracks, index: soundscapeIndex } = soundscape;
  const { isLoading } = useClonedTrackIds({
    sourceSoundscapeId: sourceId,
    currentTrackCount: tracks.length,
    soundscapeIndex
  });
  const dispatch = useDispatch();

  const loopCount = tracks.filter(track => isLoop(track)).length;
  const oneShotCount = tracks.filter(track => isOneShot(track)).length;

  function open() {
    dispatch(openSoundscape({ soundscapeIndex }));
  }

  return (
    <div className="soundscape-list-item-container">
      <h4>{name}</h4>
      <DefaultButton onClick={open} text="Open" />
      <p>isLoading: {isLoading.toString()}</p>
      <p>Loop count: {loopCount}</p>
      <p>One Shot count: {oneShotCount}</p>
    </div>
  );
}