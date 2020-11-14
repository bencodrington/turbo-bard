import { SoundscapeSearchResult } from "../models/SoundscapeSearchResult";

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

const DUMMY_TRACK_DATA: {id: string, tracks: string[]}[] = [
  {
    id: "1",
    // name: 'Graveyard',
    tracks: ['cheese']
  },
  {
    id: "2",
    // name: 'Crowded Tavern',
    tracks: ['drink']
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