import React, { useEffect, useState } from "react";
import { fetchTracksForSoundscape } from "../../services/database";

import "./SoundscapeListItem.scss";

type SoundscapeListItemProps = {
  name: string,
  cloneFrom?: string
};

export default function SoundscapeListItem({ cloneFrom, name }: SoundscapeListItemProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [tracks, setTracks] = useState<string[]>([]);

  useEffect(() => {
    if (
      hasLoaded ||
      isLoading ||
      cloneFrom === undefined ||
      tracks.length > 0
    ) return;
    // If we're not loading and we have a cloneId and have no tracks, we should fetch
    async function fetch(soundscapeId: string) {
      const result = await fetchTracksForSoundscape(soundscapeId);
      setHasLoaded(true);
      setIsLoading(false);
      if (result === undefined) return;
      setTracks(result.tracks);
    }
    setIsLoading(true);
    fetch(cloneFrom);
    // TODO: isCancelled
  }, [cloneFrom, hasLoaded, isLoading, tracks.length]);

  return (
    <div className="soundscape-list-item-container">
      <h4>{name}</h4>
      <p>isLoading: {isLoading.toString()}</p>
      <p>Track count: {tracks.length}</p>
    </div>
  );
}