import React from "react";
import { isLoop, isOneShot } from "../../models/Track";
import { useSoundscapes } from "../../slices";
import LoopTrackListItem from "./LoopTrackListItem";
import TrackListHeader from "./TrackListHeader";

export default function TrackList() {
  const soundscapes = useSoundscapes();

  return (
    <div className="track-list-container">
      <TrackListHeader />
      {soundscapes.map(soundscape =>
        soundscape.tracks.map(track => {
          if (isLoop(track)) {
            return <LoopTrackListItem
              key={soundscape.id + '-' + track.index}
              soundscapeIndex={soundscape.id}
              loop={track}
              isVisible={soundscape.isOpen}
            />
          } else if (isOneShot(track)) {
            // TODO:
            return null;
          } else {
            return null;
          }
        })
      )}
    </div>
  );
}