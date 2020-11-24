import React from "react";
import { useSoundscapes } from "../../slices";
import TrackListHeader from "./TrackListHeader";
import TrackListItem from "./TrackListItem";

export default function TrackList() {
  const soundscapes = useSoundscapes();

  return (
    <div className="track-list-container">
      <TrackListHeader />
      {soundscapes.map(soundscape =>
        soundscape.tracks.map(track =>
          // TODO: pass soundscape.isOpen
          <TrackListItem
            key={soundscape.id + '-' + track.index}
            soundscapeIndex={soundscape.id}
            track={track}
          />
        )
      )}
    </div>
  );
}