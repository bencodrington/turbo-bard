import { unmute } from "./unmute.min";

const ALLOW_BACKGROUND_PLAYBACK_IOS = true;
const FORCE_IOS_BEHAVIOUR = false;

export const createHowl = (
  src: string,
  isLoop: boolean,
  onload?: () => void
) => {
  const newHowl = new Howl({
    src: [src],
    loop: isLoop,
    preload: isLoop ? false : true,
    onload,
  });
  // Apply a hack to ensure that it plays even if iOS silent mode is off
  unmute(window.Howler.ctx, ALLOW_BACKGROUND_PLAYBACK_IOS, FORCE_IOS_BEHAVIOUR);
  return newHowl;
};
