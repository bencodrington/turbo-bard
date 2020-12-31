import { useEffect, useState } from "react";
import useBoolean from "./useBoolean";

type ReturnType = {
  volume: number,
  setVolume: (newValue: number) => void,
  isMuted: boolean,
  toggleIsMuted: () => void
};

type PropType = {
  initialVolume: number,
  onVolumeChanged: (newValue: number) => void
};

export function useVolume({
  initialVolume,
  onVolumeChanged
}: PropType): ReturnType {
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, , toggleIsMuted] = useBoolean(false);
  useEffect(() => {
    onVolumeChanged(volume);
  }, [onVolumeChanged, volume]);
  return { volume, setVolume, isMuted, toggleIsMuted };
}