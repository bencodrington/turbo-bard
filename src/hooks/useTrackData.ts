import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTrackDataById } from "../services/database";
import { ERROR_TYPE, TrackData, TrackDataError } from "../models/DatabaseTypes";
import { setTrackData } from "../slices/soundscapes";

export default function useTrackData(id: string, index: number, groupIndex: number, isLoaded: boolean) {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [results, setResults] = useState<TrackData | TrackDataError | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let fetchingDataFor = id;
    async function fetchData() {
      const trackData = await fetchTrackDataById(id);
      if (id !== fetchingDataFor) return;
      if (trackData === undefined) {
        setResults({ id: id, type: ERROR_TYPE })
        setIsLoadingData(false);
        return;
      }
      setResults(trackData);
      setIsLoadingData(false);
    }
    if (!isLoaded && !isLoadingData && results === null) {
      setIsLoadingData(true);
      fetchData();
    }
  }, [isLoaded, isLoadingData, id, dispatch, index, results]);

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