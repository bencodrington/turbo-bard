import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTrackDataById } from "../services/database";
import { ERROR_TYPE } from "../models/DatabaseTypes";
import { setTrackData } from "../slices/groups";
import { isUnloaded, Track } from "../models/Track";

export default function useTrackMetadata(track: Track, groupIndex: number) {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const dispatch = useDispatch();
  const { id, index } = track;

  // Determine whether we should start loading metadata
  // If:
  //  - data isn't already loaded in the store
  //  - we haven't already started loading data
  //  - we haven't already tried and failed to load it
  useEffect(() => {
    if (isUnloaded(track) && !isLoadingData && !(track.type === ERROR_TYPE)) {
      setIsLoadingData(true);
    }
  }, [track, isLoadingData]);

  // Fetch metadata if `isLoadingData` is true.
  // Save it to the store.
  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      const trackData = await fetchTrackDataById(id);
      if (isCancelled) return;
      dispatch(
        setTrackData({
          groupIndex,
          trackIndex: index,
          trackData: trackData ?? { id, type: ERROR_TYPE },
        })
      );
      setIsLoadingData(false);
    }
    if (isLoadingData) {
      fetchData();
      return () => {
        isCancelled = true;
      };
    }
  }, [isLoadingData, id, dispatch, index, groupIndex]);
}
