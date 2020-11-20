import React from "react";
import { useOpenSoundscape } from "../../slices";

export default function TrackList() {
  const openSoundscape = useOpenSoundscape();
  const tracks = openSoundscape?.tracks ?? [];

  return (
    <div className="track-list-container">
      {tracks.map((track, index) => <p key={index}>{track}</p>)}
    </div>
  );
}