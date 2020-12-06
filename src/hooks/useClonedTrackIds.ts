import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTrackIdsForSoundscape } from "../services/database";
import { setTrackIds } from "../slices/soundscapes";

type PropType = {
  sourceSoundscapeId?: string,
  currentTrackCount: number,
  soundscapeIndex: number
};

// This hook is used when a soundscape search result is selected by the user.
// It takes the ID of a soundscape on the backend, and fetches the list of
//  track IDs belonging to that soundscape.
// It then dispatches an action to store the track IDs in the redux store.
// Note that it won't run if the local soundscape entry already has tracks
//  associated with it (i.e. on subsequent loads from localstorage)
export default function useClonedTrackIds({
  sourceSoundscapeId,
  currentTrackCount,
  soundscapeIndex
}: PropType) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      hasLoaded ||
      sourceSoundscapeId === undefined ||
      currentTrackCount > 0
    ) return;
    let isCancelled = false;
    // If we're not loading and we have a cloneId and have no tracks, we should fetch
    async function fetch(sourceSoundscapeId: string) {
      const result = await fetchTrackIdsForSoundscape(sourceSoundscapeId);
      if (isCancelled) return;
      setHasLoaded(true);
      setIsLoading(false);
      dispatch(setTrackIds({ soundscapeIndex, trackIds: result }));
    }
    setIsLoading(true);
    fetch(sourceSoundscapeId);
    return () => {
      isCancelled = true;
    }
  }, [
    sourceSoundscapeId,
    hasLoaded,
    currentTrackCount,
    dispatch,
    soundscapeIndex
  ]);

  return { isLoading };
}