import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Soundscape } from "../../models/Soundscape";
import { isLoop, isOneShot, Track } from "../../models/Track";
import { fetchTracksForSoundscape } from "../../services/database";
import { setTracks, openSoundscape } from "../../slices/soundscapes";
import DefaultButton from "../../widgets/buttons/DefaultButton";

import "./SoundscapeListItem.scss";

type SoundscapeListItemProps = {
  soundscape: Soundscape
};

export default function SoundscapeListItem({ soundscape }: SoundscapeListItemProps) {
  const { sourceId, name, tracks, index: soundscapeIndex } = soundscape;
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
      dispatch(setTracks({ soundscapeIndex, tracks: result as Track[] }));
    }
    setIsLoading(true);
    fetch(sourceId);
    // TODO: isCancelled
  }, [sourceId, hasLoaded, isLoading, tracks.length, dispatch, soundscapeIndex]);

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