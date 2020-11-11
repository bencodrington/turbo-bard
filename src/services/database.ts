import { Soundscape } from "../models/Soundscape";
import { SoundscapeSearchResult } from "../models/SoundscapeSearchResult";

const DUMMY_SOUNDSCAPE_DATA: SoundscapeSearchResult[] = [
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

export async function fetchSoundscapes(searchText: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return DUMMY_SOUNDSCAPE_DATA;
}