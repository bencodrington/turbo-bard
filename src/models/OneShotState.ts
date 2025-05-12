// Contains information about the current state of a one shot track, so that it
//  can be accessed by the different parts of the app that need it, e.g.
//  the parts that control the actual Howl objects, and the interface elements
//  that display and modify that state.

export type OneShotState = {
  // The duration from when the one shot fired most recently to when it will
  //  fire next.
  // Has a value of `null` when the one shot isn't playing.
  timerDuration: number | null;
  // The point at which the user clicked play, or when the most recent one-shot
  //  sound was fired (restarting the timer).
  // Has a value of `null` when the one shot isn't playing.
  timerStartTimestamp: number | null;

  // Signals to useOneShotPlayer that a sound should be selected and fired
  shouldPlayNow: boolean;
}