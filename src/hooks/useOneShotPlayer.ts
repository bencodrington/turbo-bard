import { useEffect, useState } from "react";
import useBoolean from "./useBoolean";


export default function useOneShotPlayer(srcSets: string[][], volume: number) {
  // TODO: use multiple sounds
  // TODO: validate that the extension is supported, fallback to subsequent ones
  const src = srcSets[0][0];
  const [isPlaying, setIsPlaying, toggleIsPlaying] = useBoolean(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playNow, setPlayNow] = useState(false);
  const [timerStartTimestamp, setTimerStartTimestamp] = useState<number | null>(null);

  useEffect(() => {
    if (src === undefined) return;
    const newAudio = new Audio(src);
    newAudio.oncanplaythrough = () => {
      setIsLoaded(true);
    }
    setAudio(newAudio);
    return function cleanup() {
      newAudio.remove();
    }
  }, [src]);

  // If start is clicked,
  //  or if audio loads and isPlaying is true,
  //  or if sound was just played
  //  set timeout

  // If stop is clicked,
  //  or on cleanup
  //  clear timeout

  useEffect(() => {
    // Handle start/stop button clicks
    if (audio === null) return;
    if (isPlaying) {
      setTimerStartTimestamp(Date.now());
    } else {
      setTimerStartTimestamp(null);
    }
  }, [audio, isPlaying]);

  useEffect(() => {
    // Start a timer whenever a new (non-null)
    // timerStartTimestamp is set
    if (timerStartTimestamp === null) return;
    const timeout = setTimeout(() => {
      setPlayNow(true);
      // Restart timer
      setTimerStartTimestamp(Date.now());
    }, 2000);
    return () => clearTimeout(timeout);
  }, [timerStartTimestamp])

  useEffect(() => {
    if (!playNow) return;
    setPlayNow(false);
    if (isLoaded) {
      // Play sound
      console.log('play sound', src);
    }
  }, [playNow, isLoaded, src]);

  useEffect(() => {
    if (audio === null) return;
    audio.volume = volume;
  });

  return { isPlaying, setIsPlaying, toggleIsPlaying, isLoaded };
}