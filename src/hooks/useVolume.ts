import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTrackIsMuted, setTrackVolume } from "../slices/groups";
import useBoolean from "./useBoolean";

type ReturnType = {
  volume: number,
  setVolume: (newValue: number) => void,
  isMuted: boolean,
  toggleIsMuted: () => void
};

type PropType = {
  initialVolume: number,
  groupIndex: number,
  trackIndex: number
};

export function useVolume({
  initialVolume,
  groupIndex,
  trackIndex
}: PropType): ReturnType {
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, , toggleIsMuted] = useBoolean(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTrackVolume({
      groupIndex,
      trackIndex,
      volume
    }));
  }, [dispatch, groupIndex, trackIndex, volume]);

  useEffect(() => {
    dispatch(setTrackIsMuted({
      groupIndex,
      trackIndex,
      isMuted
    }));
  }, [dispatch, groupIndex, trackIndex, isMuted])
  return { volume, setVolume, isMuted, toggleIsMuted };
}