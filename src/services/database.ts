import { Soundscape } from "../models/Soundscape";

const DUMMY_SOUNDSCAPE_DATA: Soundscape[] = [
  {
    id: "1",
    name: 'Test Soundscape 1',
    tracks: []
  },
  {
    id: "2",
    name: 'Test Soundscape 2',
    tracks: []
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