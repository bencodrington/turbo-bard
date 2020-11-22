import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Soundscape } from "../../models/Soundscape";
import { Track } from "../../models/Track";
import { fetchTracksForSoundscape } from "../../services/database";
import { setTracks } from "../../slices/soundscapes";

import "./SoundscapeListItem.scss";

type SoundscapeListItemProps = {
  soundscape: Soundscape
};

export default function SoundscapeListItem({ soundscape }: SoundscapeListItemProps) {
  const { sourceId, name, tracks, id: soundscapeId } = soundscape;
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      hasLoaded ||
      isLoading ||
      sourceId === undefined ||
      tracks.length > 0
    ) return;
    // If we're not loading and we have a cloneId and have no tracks, we should fetch
    async function fetch(sourceSoundscapeId: string) {
      const result = await fetchTracksForSoundscape(sourceSoundscapeId);
      setHasLoaded(true);
      setIsLoading(false);
      dispatch(setTracks({ soundscapeId, tracks: result as Track[] }));
    }
    setIsLoading(true);
    fetch(sourceId);
    // TODO: isCancelled
  }, [sourceId, hasLoaded, isLoading, tracks.length, dispatch, soundscapeId]);

  return (
    <div className="soundscape-list-item-container">
      <h4>{name}</h4>
      <p>isLoading: {isLoading.toString()}</p>
      <p>Track count: {tracks.length}</p>
    </div>
  );
}