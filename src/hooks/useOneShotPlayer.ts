import { useEffect, useState } from "react";
import useBoolean from "./useBoolean";

const SERIALIZATION_DELIMITER = '----';

function serializeSources(srcSets: string[][]) {
  // TODO: validate that the extension is supported, fallback to subsequent ones
  return srcSets.map(srcSet => srcSet[0]).join(SERIALIZATION_DELIMITER);
}

function deserializeSources(serializedSources: string) {
  return serializedSources.split(SERIALIZATION_DELIMITER);
}

export default function useOneShotPlayer(srcSets: string[][], volume: number) {
  const [isPlaying, setIsPlaying, toggleIsPlaying] = useBoolean(false);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
  const [playNow, setPlayNow] = useState(false);
  // The point at which the user clicked play, or when the most recent one-shot
  //  sound was fired (restarting the timer)
  const [timerStartTimestamp, setTimerStartTimestamp] = useState<number | null>(null);

  // Serializing sources is necessary so that audio elements are only created
  //  when the sources themselves change. Since useEffect's dependency array
  //  uses shallow equality, and the source array itself changes every render,
  //  we serialize it into a string to compare the values themselves.
  const serializedSources = serializeSources(srcSets);
  useEffect(() => {
    const sources = deserializeSources(serializedSources);
    if (sources.length === 0) return;
    const newAudioElements = sources.map(source => new Audio(source));
    newAudioElements.forEach(newAudio => {
      const loadedHandler = () => {
        // Once loaded, append it to list of loaded audio elements
        setAudioElements(_audioElements => [..._audioElements, newAudio]);
        newAudio.removeEventListener('canplaythrough', loadedHandler);
      }
      newAudio.addEventListener('canplaythrough', loadedHandler);
    });
    return function cleanup() {
      newAudioElements.forEach(newAudio => newAudio.remove());
    }
  }, [serializedSources]);

  useEffect(() => {
    // Handle start/stop button clicks
    if (isPlaying) {
      setTimerStartTimestamp(Date.now());
    } else {
      setTimerStartTimestamp(null);
    }
  }, [isPlaying]);

  // Start a timer whenever a new (non-null)
  // timerStartTimestamp is set
  useEffect(() => {
    if (timerStartTimestamp === null) return;
    const timeout = setTimeout(() => {
      setPlayNow(true);
      // Restart timer
      setTimerStartTimestamp(Date.now());
      // TODO: actual timer length should be randomly selected
      // from a user-configurable range
    }, 2000);
    return () => clearTimeout(timeout);
  }, [timerStartTimestamp])

  // Play a sound randomly selected from the sources
  useEffect(() => {
    if (!playNow) return;
    setPlayNow(false);
    if (audioElements.length > 0) {
      const randomIndex = Math.floor(Math.random() * audioElements.length);
      const audio = audioElements[randomIndex];
      // Restart from the beginning, in case the sound
      //  is currently playing
      audio.currentTime = 0;
      audio.play();
    }
  }, [playNow, audioElements]);

  // Keep audio volume in sync
  useEffect(() => {
    audioElements.forEach(audio => {
      audio.volume = volume;
    });
  });

  return { isPlaying, setIsPlaying, toggleIsPlaying };
}