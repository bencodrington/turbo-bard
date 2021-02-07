import { useEffect, useState } from "react";
import { clamp } from "../utils/mathUtil";

const FADE_DURATION_SECONDS = 1;
const FRAMES_PER_SECOND = 30;
const PERCENT_CHANGE_PER_SECOND = 1 / FADE_DURATION_SECONDS;
const PERCENT_CHANGE_PER_FRAME = PERCENT_CHANGE_PER_SECOND / FRAMES_PER_SECOND;

export function useFadeMultiplier(isFadingIn: boolean) {

  const [fadeMultiplier, setFadeMultiplier] = useState(0);

  useEffect(() => {
    const direction = isFadingIn ? 1 : -1;
    const interval = setInterval(() => {
      const change = PERCENT_CHANGE_PER_FRAME * direction;
      setFadeMultiplier((_fadeMultiplier) => clamp(0, _fadeMultiplier + change, 1));
    }, 1000 / FRAMES_PER_SECOND);
    return () => { clearInterval(interval); }
  }, [isFadingIn])

  return fadeMultiplier;
}