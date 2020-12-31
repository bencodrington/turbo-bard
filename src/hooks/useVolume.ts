import { useEffect, useState } from "react";

type ReturnType = [
  number,
  (newValue: number) => void
];

type PropType = {
  initialVolume:  number,
  onVolumeChanged: (newValue: number) => void
};

export function useVolume({
  initialVolume,
  onVolumeChanged
}: PropType): ReturnType {
  const [volume, setVolume] = useState(initialVolume);
  useEffect(() => {
    onVolumeChanged(volume);
  }, [onVolumeChanged, volume]);
  return [volume, setVolume];
}