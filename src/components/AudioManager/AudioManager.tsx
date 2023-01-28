import React from "react";
import { isLoop, isOneShot, isUnloaded, isUnloadedLoop } from "../../models/Track";
import { useGroups } from "../../slices";
import { constructKey } from "../../utils/tsxUtil";
import LoopAudio from "./LoopAudio";
import OneShotAudio from "./OneShotAudio";

/* This component is responsible for making sure audio is playing for the right
    sounds, at the right times, at the right volumes.

    This includes creating and deleting Howler objects, and fading sounds in and
    out, for all sounds in all groups.

    To accomplish this, the component watches the groups store and updates the
    sounds accordingly.
    
    This component would be a composable, but it is useful
    to create (invisible) child components for each sound to manage its own
    state with hooks and lifecycle events.
*/

export default function AudioManager() {
  const groups = useGroups();
  // Make an Audio component for each sound in each group
  return (<>{
    groups.map(group =>
      group.tracks.map(track => {
        if (isLoop(track) || isUnloadedLoop(track)) {
          return <LoopAudio
            loop={track}
            groupIndex={group.index}
            key={constructKey(group, track)}
          />
        } else if (isOneShot(track) || isUnloaded(track)) {
          return <OneShotAudio
            oneShot={track}
            groupIndex={group.index}
            key={constructKey(group, track)}
          />
        }
        return null;
      })
    )
  }</>);
}