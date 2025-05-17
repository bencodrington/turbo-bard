import { useEffect, useState } from "react";
import { getAudioFileUrl } from "../utils/audioFileUtil";
import { randIntBetween } from "../utils/mathUtil";
import { useFadeMultiplier } from "./useFadeMultiplier";
import { Howl } from "howler";
import { useOneShotStates } from "../slices";
import {
  setTimerStartTimestamp,
  setTimerDuration,
  setShouldPlayNow,
  setUserTriggeredPlayOnceNow,
} from "../slices/oneShotStates";
import { useDispatch } from "react-redux";
const FADE_DURATION_SECONDS = 2;

const SERIALIZATION_DELIMITER = "----";

function serializeSources(samples: string[]) {
  return samples
    .map((filename) => getAudioFileUrl(filename))
    .join(SERIALIZATION_DELIMITER);
}

function deserializeSources(serializedSources: string) {
  return serializedSources.split(SERIALIZATION_DELIMITER);
}

export default function useOneShotPlayer(
  // ID for reading and writing to the correct entry in the oneShotStates store
  oneShotTrackId: string,
  samples: string[],
  volume: number,
  minSecondsBetween: number,
  maxSecondsBetween: number,
  isPlaying: boolean
) {
  const [howls, setHowls] = useState<Howl[]>([]);
  const fadeMultiplier = useFadeMultiplier(isPlaying);

  const oneShotStates = useOneShotStates();
  const { timerStartTimestamp, shouldPlayNow, userTriggeredPlayOnceNow } =
    oneShotStates[oneShotTrackId] ?? {
      timerStartTimestamp: null,
      shouldPlayNow: false,
      userTriggeredPlayOnceNow: false,
    };

  const dispatch = useDispatch();

  // Serializing sources is necessary so that audio elements are only created
  //  when the sources themselves change. Since useEffect's dependency array
  //  uses shallow equality, and the source array itself changes every render,
  //  we serialize it into a string to compare the values themselves.
  const serializedSources = serializeSources(samples);
  useEffect(() => {
    const sources = deserializeSources(serializedSources);
    if (sources.length === 0) return;
    const newHowls = sources.map(
      (source) => new Howl({ src: [source], html5: true })
    );
    newHowls.forEach((newHowl) => {
      // Once loaded, append it to list of loaded audio elements
      const appendToHowlList = () => {
        setHowls((_howls) => [..._howls, newHowl]);
      };
      if (newHowl.state() === "loaded") {
        // Sound is already loaded in howler (probably the same one shot was
        //  added twice)
        appendToHowlList();
        return;
      }
      newHowl.once("load", appendToHowlList);
    });
    return function cleanup() {
      newHowls.forEach((newHowl) => {
        newHowl.fade(newHowl.volume(), 0, FADE_DURATION_SECONDS * 1000);
        newHowl.once("fade", () => newHowl.unload());
      });
    };
  }, [serializedSources]);

  useEffect(() => {
    // Handle start/stop button clicks
    if (isPlaying) {
      dispatch(
        setTimerStartTimestamp({
          oneShotTrackId,
          timerStartTimestamp: performance.now(),
        })
      );
    } else {
      dispatch(
        setTimerStartTimestamp({
          oneShotTrackId,
          timerStartTimestamp: null,
        })
      );
    }
  }, [isPlaying, dispatch, oneShotTrackId]);

  // Start a timer whenever a new (non-null)
  // timerStartTimestamp is set
  useEffect(() => {
    if (timerStartTimestamp === null) return;
    const timerLength = randIntBetween(
      minSecondsBetween * 1000,
      maxSecondsBetween * 1000
    );
    const timeout = setTimeout(() => {
      dispatch(setShouldPlayNow({ oneShotTrackId, shouldPlayNow: true }));
      // Restart timer
      dispatch(
        setTimerStartTimestamp({
          oneShotTrackId,
          timerStartTimestamp: performance.now(),
        })
      );
    }, timerLength);
    dispatch(setTimerDuration({ oneShotTrackId, timerDuration: timerLength }));
    return () => clearTimeout(timeout);
  }, [
    timerStartTimestamp,
    dispatch,
    minSecondsBetween,
    maxSecondsBetween,
    oneShotTrackId,
  ]);

  // TODO: move this to the rendering component
  // useEffect(() => {
  //   // Start wick burning animation
  //   function animateWick(time: number) {
  //     if (
  //       wickRef.current === null ||
  //       timerStartTimestamp === null ||
  //       timerDuration === null
  //     )
  //       return;
  //     const timeElapsed = time - timerStartTimestamp;
  //     const percentageElapsed = clamp(0, timeElapsed / timerDuration, 1);
  //     const percentageRemaining = 1 - percentageElapsed;
  //     wickRef.current.style.transform = `scaleX(${percentageRemaining})`;
  //     if (percentageRemaining === 0) return;
  //     wickAnimationRafId = requestAnimationFrame(animateWick);
  //   }
  //   let wickAnimationRafId = requestAnimationFrame(animateWick);
  //   return () => cancelAnimationFrame(wickAnimationRafId);
  // }, [timerStartTimestamp, timerDuration, wickRef]);

  // Whenever shouldPlayNow is set to true, play a sound randomly selected from
  //  the sources
  useEffect(() => {
    if (!shouldPlayNow) return;
    if (howls.length > 0) {
      const randomIndex = Math.floor(Math.random() * howls.length);
      const howl = howls[randomIndex];
      // Restart from the beginning, in case the sound
      //  is currently playing
      howl.play();
    }
    dispatch(setShouldPlayNow({ oneShotTrackId, shouldPlayNow: false }));
  }, [shouldPlayNow, dispatch, oneShotTrackId, howls]);

  // Whenever userTriggeredPlayOnceNow is set to true, play a sound randomly
  //  selected from the sources, regardless of fade multiplier. Even if the
  //  containing group is stopped, user triggered plays should be audible.
  useEffect(() => {
    if (!userTriggeredPlayOnceNow) return;
    if (howls.length > 0) {
      const randomIndex = Math.floor(Math.random() * howls.length);
      const howl = howls[randomIndex];
      howl.volume(volume);
      console.log("playing", howl, "at", volume);
      // Restart from the beginning, in case the sound
      //  is currently playing
      howl.play();
    }
    dispatch(setUserTriggeredPlayOnceNow({ oneShotTrackId, newValue: false }));
  }, [userTriggeredPlayOnceNow, dispatch, oneShotTrackId, howls, volume]);

  // Keep audio volume in sync
  useEffect(() => {
    howls.forEach((howl) => {
      howl.volume(fadeMultiplier * volume);
    });
  });
}
