import { useEffect, useState } from "react";
import useBoolean from "./useBoolean";


export default function useLoopPlayer(srcSet: string[]) {
  // TODO: remove hardcoded value and validate that the extension is supported
  const src = srcSet[0] || `http://phanary.com/audio/converted/ominous-ambience.webm`;
  const [isPlaying, setIsPlaying, toggleIsPlaying] = useBoolean(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const newAudio = new Audio(src);
    newAudio.oncanplaythrough = () => {
      setIsLoaded(true);
    }
    setAudio(newAudio);
    return function cleanup() {
      newAudio.remove();
    }
  }, [src])

  useEffect(() => {
    if (audio === null) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  return { isPlaying, setIsPlaying, toggleIsPlaying, isLoaded };
}