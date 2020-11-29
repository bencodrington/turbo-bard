import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTrackById } from "../services/database";
import { setTrackData } from "../slices/soundscapes";

export default function useTrackData(id: string, index: number, soundscapeIndex: number, isLoaded: boolean) {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let fetchingDataFor = id;
    async function fetchData() {
      const trackData = await fetchTrackById(id);
      if (id !== fetchingDataFor) return;
      if (trackData === undefined) {
        setIsLoadingData(false);
        return;
      }
      dispatch(setTrackData({ soundscapeIndex, trackIndex: index, trackData }))
      setIsLoadingData(false);
    }
    if (!isLoaded && !isLoadingData) {
      setIsLoadingData(true);
      fetchData();
    }
  }, [isLoaded, isLoadingData, id, dispatch, index, soundscapeIndex]);
}