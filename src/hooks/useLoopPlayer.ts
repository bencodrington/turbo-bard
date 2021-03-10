import { useEffect, useState } from "react";
import { fadeOutAndPause, getAudioFileUrl } from "../utils/audioFileUtil";
import { useFadeMultiplier } from "./useFadeMultiplier";

export default function useLoopPlayer(volume: number, isPlaying: boolean, fileName?: string) {
  const src = fileName !== undefined ? getAudioFileUrl(fileName) : undefined;
  const [isLoaded, setIsLoaded] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const fadeMultiplier = useFadeMultiplier(isPlaying);

  useEffect(() => {
    if (src === undefined) return;
    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.oncanplaythrough = () => {
      setIsLoaded(true);
    }
    setAudio(newAudio);
    return function cleanup() {
      fadeOutAndPause(newAudio);
    }
  }, [src]);

  useEffect(() => {
    if (audio === null) return;
    if (isPlaying) {
      audio.play();
    } else if (fadeMultiplier <= 0) {
      audio.pause();
    }
    audio.volume = volume * fadeMultiplier;
  });

  return { isLoaded };
}