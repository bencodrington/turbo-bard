import { SoundscapeSearchResult } from "../models/SoundscapeSearchResult";
import { Track } from "../models/Track";

const DUMMY_SOUNDSCAPE_RESULT_DATA: SoundscapeSearchResult[] = [
  {
    id: "1",
    name: 'Graveyard',
    tags: []
  },
  {
    id: "2",
    name: 'Crowded Tavern',
    tags: []
  }
];

const DUMMY_TRACK_DATA: {id: string, tracks: Track[]}[] = [
  {
    id: "1",
    // name: 'Graveyard',
    tracks: [{name: 'cheese', id: '111111'}]
  },
  {
    id: "2",
    // name: 'Crowded Tavern',
    tracks: [{name: 'drink', id: '222222'}, {name: 'slurp', id: '33333'}]
  }
];

export async function fetchSoundscapeResults(searchText: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return DUMMY_SOUNDSCAPE_RESULT_DATA;
}

export async function fetchTracksForSoundscape(soundscapeId: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return DUMMY_TRACK_DATA.find(result => result.id === soundscapeId);
}