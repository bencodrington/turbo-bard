import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTrackDataById } from "../services/database";
import { ERROR_TYPE, TrackData, TrackDataError } from "../models/DatabaseTypes";
import { setTrackData } from "../slices/groups";

export default function useTrackData(id: string, index: number, groupIndex: number, isLoaded: boolean) {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [results, setResults] = useState<TrackData | TrackDataError | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded && !isLoadingData && results === null) {
      // We should start loading data
      setIsLoadingData(true);
    }
  }, [isLoaded, isLoadingData, results]);

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      const trackData = await fetchTrackDataById(id);
      if (isCancelled) return;
      if (trackData === undefined) {
        setResults({ id, type: ERROR_TYPE })
        setIsLoadingData(false);
        return;
      }
      setResults(trackData);
      setIsLoadingData(false);
    }
    if (isLoadingData) {
      fetchData();
      return () => { isCancelled = true; };
    }
  }, [isLoadingData, id, dispatch, index, results]);

  useEffect(() => {
    if (results !== null && !isLoaded && !isLoadingData) {
      dispatch(setTrackData({
        groupIndex,
        trackIndex: index,
        trackData: results
      }));
    }
  })


}