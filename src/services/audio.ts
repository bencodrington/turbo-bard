import { Howl } from 'howler';
import { Track } from '../models/Track';

export type AudioList = {
  [id: string]: Howl
};

function newAudio() {
  return {} as AudioList;
}

// List of tracks, each with a Howl object
// Volume multiplier for this soundscape

// Diffs the passed in `tracks` state with the actual set of howl
//  objects and corrects differences
function reconcile(tracks: Track[], audio: AudioList) {
  // const untouchedIndices = Object.keys(audio);
  // tracks.forEach(track => {
  //   const { index, trackMetadata } = track;
  //   const { name, source } = trackMetadata;
  //   const howl = audio[index];
  //   if (howl === undefined) {
  //     // This track was just added, so create a howl for it
  //     console.log(`${name}, ${source.url} was just added, create a howl for it`);
  //     // TODO:
  //   } else {
  //     // Remove this index from the array of indices that haven't
  //     //  been inspected during this diff() call
  //     untouchedIndices.filter(untouchedIndex => untouchedIndex !== index.toString());
  //     // TODO: diff the state of the track with the state of the howl
  //   }
  // });
  // // Each index in `untouched` no longer exists in the tracks list,
  // //  and should be destroyed
  // untouchedIndices.forEach(untouchedIndex => {
  //   console.log(`index ${untouchedIndex} no longer exists in the tracks list, destroy it.`);
  //   // TODO:
  // });
};

export default {
  newAudio,
  reconcile
};