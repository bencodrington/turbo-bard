import React from "react";
import { Track } from "../../models/Track";
import DefaultButton from "../../widgets/buttons/DefaultButton";

import "./TrackListItem.scss";

type TrackListItemProps = {
  track: Track
};

export default function TrackListItem({ track }: TrackListItemProps) {
  const { trackMetadata } = track;
  function displaySource() {
    console.log('TODO');
  }
  function toggleMuted() {
    console.log('TODO');
  }
  function toggleIsPlaying() {
    console.log('TODO');
  }
  function remove() {
    console.log('TODO');
  }
  return (
    <div>
      <p>{trackMetadata.name}</p>
      {/* TODO: volume slider */}
      <DefaultButton
        onClick={toggleMuted}
        text="toggle mute"
      />
      <DefaultButton
        onClick={toggleIsPlaying}
        text="toggle playing"
      />
      <DefaultButton
        onClick={displaySource}
        text="source"
      />
      <DefaultButton
        onClick={remove}
        text="x"
      />
    </div>
  );
}