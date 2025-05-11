// Contains information about the current state of a one shot track, so that it
//  can be accessed by the different parts of the app that need it, e.g.
//  the parts that control the actual Howl objects, and the interface elements
//  that display and modify that state.

// TODO: extract this type
// TODO: refine this type

export type OneShotState = {
  // store info like “how long it was last fired” and “total length of the current wick” (and let the rendering element handle the animation)
  // store info like “shouldPlay” and let the “play now” button modify that directly
}