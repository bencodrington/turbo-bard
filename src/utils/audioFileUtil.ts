import { clamp } from "./mathUtil";

export function createSourceSet(fileName: string) {
  return [
    `https://storage.googleapis.com/turbo-bard.appspot.com/${fileName}.webm`,
    `https://storage.googleapis.com/turbo-bard.appspot.com/${fileName}.mp3`
  ];
}

const FADE_DURATION_SECONDS = 2;
const FRAMES_PER_SECOND = 30;
const PERCENT_CHANGE_PER_SECOND = 1 / FADE_DURATION_SECONDS;
const PERCENT_CHANGE_PER_FRAME = PERCENT_CHANGE_PER_SECOND / FRAMES_PER_SECOND;

export function fadeOutAndPause(audio: HTMLAudioElement) {
  const interval = setInterval(() => {
    audio.volume = clamp(0, audio.volume - PERCENT_CHANGE_PER_FRAME, 1);
    if (audio.volume <= 0) {
      audio.pause();
      clearInterval(interval);
    }
  }, 1000 / FRAMES_PER_SECOND);
}