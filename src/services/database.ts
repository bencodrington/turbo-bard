import { SoundscapeSearchResult } from "../models/SoundscapeSearchResult";
import { Loop, OneShot, Track, TrackMetadata } from "../models/Track";

const TRACK_TYPES = {
  LOOP: 'LOOP',
  ONESHOT: 'ONESHOT'
};

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

type SoundscapeData = { id: string, tracks: TrackData[] }
type TrackData = { id: string, type: string, fileSource?: string, fileSources?: string[] } & TrackMetadata;

const DUMMY_SOUNDSCAPE_DATA: SoundscapeData[] = [
  {
    id: "1",
    // name: 'Graveyard',
    tracks: [
      {
        name: 'cheese',
        id: '111111',
        source: { author: 'Alice', url: 'alice@alice.com' },
        type: 'LOOP',
        fileSource: 'https://filesource.fake'
      }
    ]
  },
  {
    id: "2",
    // name: 'Crowded Tavern',
    tracks: [
      {
        name: 'drink',
        id: '222222',
        source: { author: 'Bob', url: 'bob@bob.com' },
        type: 'LOOP',
        fileSource: 'https://filesource.fake'
      },
      {
        name: 'slurp',
        id: '33333',
        source: { author: 'Charlie', url: 'charlie@charlie.com' },
        type: 'LOOP',
        fileSource: 'https://filesource.fake'
      }
    ]
  }
];

export async function fetchSoundscapeResults(searchText: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 400);
  });
  return DUMMY_SOUNDSCAPE_RESULT_DATA;
}

function trackFromTrackData(data: TrackData): Track | null {
  const { id, name, source, type, fileSource, fileSources } = data;
  switch (type) {
    case TRACK_TYPES.LOOP:
      if (fileSource === undefined) {
        console.error(`Server returned loop (id ${id}) with undefined fileSource.`);
        return null;
      }
      return {
        id,
        trackMetadata: { name, source },
        // TODO: volume and isMuted should be saved in the state
        volume: 60,
        isMuted: false,
        isPlaying: false,
        fileSource: fileSource
      } as Loop;
    case TRACK_TYPES.ONESHOT:
      if (fileSources?.length === undefined || fileSources.length === 0) {
        console.error(`Server returned oneshot (id ${id}) without fileSources.`);
        console.error(fileSources);
        return null;
      }
      return {
        id,
        trackMetadata: { name, source },
        // TODO: volume and isMuted should be saved in the state
        volume: 60,
        isMuted: false,
        isPlaying: false,
        fileSources: fileSources
      } as OneShot;
    default:
      console.error(`Server returned invalid track type: "${type}".`);
      return null;
  }
}

export async function fetchTracksForSoundscape(soundscapeId: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 400);
  });
  const tracks = DUMMY_SOUNDSCAPE_DATA.find(result => result.id === soundscapeId)?.tracks;
  if (tracks === undefined) {
    return [];
  }
  return tracks
    .map(trackFromTrackData)
    .filter(track => track !== null);
}