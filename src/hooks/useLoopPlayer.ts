import { useEffect, useState } from "react";
import { getAudioFileUrl } from "../utils/audioFileUtil";
import { useFadeMultiplier } from "./useFadeMultiplier";
import { Howl } from "howler";
const FADE_DURATION_SECONDS = 2;

export default function useLoopPlayer(
  volume: number,
  isPlaying: boolean,
  shouldLoad: boolean,
  fileName?: string
) {
  const src = fileName !== undefined ? getAudioFileUrl(fileName) : undefined;
  const [isLoaded, setIsLoaded] = useState(false);
  const [howl, setHowl] = useState<Howl | null>(null);
  const fadeMultiplier = useFadeMultiplier(isPlaying);

  useEffect(() => {
    if (src === undefined) return;
    let wasDeleted = false;
    const newHowl = new Howl({
      src: [src],
      loop: true,
      preload: false,
      onload: () => {
        if (wasDeleted) return;
        setIsLoaded(true);
      }
    });
    setHowl(newHowl);
    return () => {
      wasDeleted = true;
      newHowl.fade(newHowl.volume(), 0, FADE_DURATION_SECONDS * 1000);
      newHowl.once('fade', () => newHowl.unload());
    }
  }, [src]);

  useEffect(() => {
    // If
    //  - howl exists
    //  - and hasn't been loaded yet
    //  - and
    //    (was just added from search
    //    OR
    //    user played a track loaded from localStorage)
    // then load the audio file.
    // This logic is to avoid overloading phone memory by loading the audio for
    //  potentially hundreds of tracks from the list in localStorage.
    if (howl === null || isLoaded) return;
    if (shouldLoad || isPlaying) {
      howl.load();
    }
  }, [howl, shouldLoad, isPlaying, isLoaded])

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