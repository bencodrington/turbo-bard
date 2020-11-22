import React from "react";
import { useOpenSoundscape } from "../../slices";
import TrackListItem from "./TrackListItem";

export default function TrackList() {
  const openSoundscape = useOpenSoundscape();
  const tracks = openSoundscape?.tracks ?? [];

  return (
    <div className="track-list-container">
      {tracks.map(track => <TrackListItem key={track.id} track={track} />)}
    </div>
  );
}