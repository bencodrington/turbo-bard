import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTrackIsMuted, setTrackVolume } from "../slices/groups";
import useBoolean from "./useBoolean";

type ReturnType = {
  volume: number;
  setVolume: (newValue: number) => void;
  isMuted: boolean;
  toggleIsMuted: () => void;
};

type PropType = {
  initialVolume: number;
  isInitiallyMuted: boolean;
  groupIndex: number;
  trackIndex: number;
};

export function useVolume({
  initialVolume,
  isInitiallyMuted,
  groupIndex,
  trackIndex,
}: PropType): ReturnType {
  const dispatch = useDispatch();

  const [volume, setVolume] = useState(initialVolume);
  // Keep store in sync whenever this track's volume changes.
  useEffect(() => {
    dispatch(
      setTrackVolume({
        groupIndex,
        trackIndex,
        volume,
      })
    );
  }, [dispatch, groupIndex, trackIndex, volume]);

  const [isMuted, , toggleIsMuted] = useBoolean(isInitiallyMuted);
  // Keep store in sync whenever this track is muted/unmuted.
  useEffect(() => {
    dispatch(
      setTrackIsMuted({
        groupIndex,
        trackIndex,
        isMuted,
      })
    );
  }, [dispatch, groupIndex, trackIndex, isMuted]);

  return { volume, setVolume, isMuted, toggleIsMuted };
}
