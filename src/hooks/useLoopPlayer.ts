import { useEffect, useState } from "react";
import { getAudioFileUrl } from "../utils/audioFileUtil";
import { useFadeMultiplier } from "./useFadeMultiplier";
import { Howl } from "howler";
const FADE_DURATION_SECONDS = 2;

export default function useLoopPlayer(
  volume: number,
  isPlaying: boolean,
  fileName?: string
) {
  const src = fileName !== undefined ? getAudioFileUrl(fileName) : undefined;
  const [isLoaded, setIsLoaded] = useState(false);
  const [howl, setHowl] = useState<Howl | null>(null);
  const fadeMultiplier = useFadeMultiplier(isPlaying);

  useEffect(() => {
    if (src === undefined) return;
    const newHowl = new Howl({
      src: [src],
      loop: true,
      onload: () => setIsLoaded(true)
    });
    setHowl(newHowl);
    return () => {
      newHowl.fade(newHowl.volume(), 0, FADE_DURATION_SECONDS * 1000);
      newHowl.once('fade', () => newHowl.unload());
    }
  }, [src]);

  useEffect(() => {
    if (howl === null) return;
    if (isPlaying && !howl.playing()) {
      howl.play();
    } else if (fadeMultiplier <= 0) {
      howl.stop();
    }
    howl.volume(volume * fadeMultiplier);
  });

  return { isLoaded };
}