import { RefObject, useEffect, useState } from "react";
import { getAudioFileUrl } from "../utils/audioFileUtil";
import { clamp, randIntBetween } from "../utils/mathUtil";
import { useFadeMultiplier } from "./useFadeMultiplier";
import { Howl } from "howler";
const FADE_DURATION_SECONDS = 2;

const SERIALIZATION_DELIMITER = '----';

function serializeSources(samples: string[]) {
  return samples.map(filename => getAudioFileUrl(filename)).join(SERIALIZATION_DELIMITER);
}

function deserializeSources(serializedSources: string) {
  return serializedSources.split(SERIALIZATION_DELIMITER);
}

export default function useOneShotPlayer(
  samples: string[],
  volume: number,
  minSecondsBetween: number,
  maxSecondsBetween: number,
  isPlaying: boolean,
  wickRef: RefObject<HTMLDivElement>
) {
  const [howls, setHowls] = useState<Howl[]>([]);
  const [shouldPlayNow, setShouldPlayNow] = useState(false);
  const fadeMultiplier = useFadeMultiplier(isPlaying);
  // The point at which the user clicked play, or when the most recent one-shot
  //  sound was fired (restarting the timer)
  const [timerStartTimestamp, setTimerStartTimestamp] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState<number | null>(null);

  // Serializing sources is necessary so that audio elements are only created
  //  when the sources themselves change. Since useEffect's dependency array
  //  uses shallow equality, and the source array itself changes every render,
  //  we serialize it into a string to compare the values themselves.
  const serializedSources = serializeSources(samples);
  useEffect(() => {
    const sources = deserializeSources(serializedSources);
    if (sources.length === 0) return;
    const newHowls = sources.map(source => new Howl({ src: [source] }));
    newHowls.forEach(newHowl => {
      newHowl.once('load', () => {
        // Once loaded, append it to list of loaded audio elements
        setHowls(_howls => [..._howls, newHowl]);
      });
    });
    return function cleanup() {
      newHowls.forEach(newHowl => {
        newHowl.fade(newHowl.volume(), 0, FADE_DURATION_SECONDS * 1000);
        newHowl.once('fade', () => newHowl.unload());
      });
    };
  }, [serializedSources]);

  useEffect(() => {
    // Handle start/stop button clicks
    if (isPlaying) {
      setTimerStartTimestamp(performance.now());
    } else {
      setTimerStartTimestamp(null);
    }
  }, [isPlaying]);

  // Start a timer whenever a new (non-null)
  // timerStartTimestamp is set
  useEffect(() => {
    if (timerStartTimestamp === null) return;
    const timerLength = randIntBetween(minSecondsBetween * 1000, maxSecondsBetween * 1000);
    const timeout = setTimeout(() => {
      setShouldPlayNow(true);
      // Restart timer
      setTimerStartTimestamp(performance.now());
    }, timerLength);
    setTimerDuration(timerLength);
    return () => clearTimeout(timeout);
  }, [timerStartTimestamp, minSecondsBetween, maxSecondsBetween])

  useEffect(() => {
    // Start wick burning animation
    function animateWick(time: number) {
      if (
        wickRef.current === null ||
        timerStartTimestamp === null ||
        timerDuration === null
      ) return;
      const timeElapsed = time - timerStartTimestamp;
      const percentageElapsed = clamp(0, timeElapsed / timerDuration, 1);
      const percentageRemaining = 1 - percentageElapsed;
      wickRef.current.style.transform = `scaleX(${percentageRemaining})`;
      if (percentageRemaining === 0) return;
      wickAnimationRafId = requestAnimationFrame(animateWick);
    }
    let wickAnimationRafId = requestAnimationFrame(animateWick);
    return () => cancelAnimationFrame(wickAnimationRafId);
  }, [timerStartTimestamp, timerDuration, wickRef]);

  // Play a sound randomly selected from the sources
  useEffect(() => {
    if (!shouldPlayNow) return;
    setShouldPlayNow(false);
    if (howls.length > 0) {
      const randomIndex = Math.floor(Math.random() * howls.length);
      const howl = howls[randomIndex];
      // Restart from the beginning, in case the sound
      //  is currently playing
      howl.play();
    }
  }, [shouldPlayNow, howls]);

  // Keep audio volume in sync
  useEffect(() => {
    howls.forEach(howl => {
      howl.volume(fadeMultiplier * volume);
    });
  });

  return {
    playNow: () => setShouldPlayNow(true)
  }
}