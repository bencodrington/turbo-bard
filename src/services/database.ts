import { ObjectType } from "../models/ObjectTypes";
import { SearchResult } from "../models/SearchResult";
import { Loop, OneShot, Track, TrackMetadata } from "../models/Track";

const DUMMY_SOUNDSCAPE_RESULT_DATA: SearchResult[] = [
  {
    id: "1",
    name: 'Graveyard',
    tags: ['spooky', 'scary', 'eerie', 'haunted', 'ghosts', 'spirits', 'cemetery', 'crypt'],
    type: ObjectType.SOUNDSCAPE
  },
  {
    id: "2",
    name: 'Crowded Tavern',
    tags: ['lively', 'ale', 'beer', 'inn', 'warm', 'cozy', 'busy', 'happy', 'drinks', 'merry'],
    type: ObjectType.SOUNDSCAPE
  }
];

const DUMMY_TRACK_RESULT_DATA: SearchResult[] = [
  {
    id: "111111",
    name: 'Ominous Ambience',
    tags: ['loop', 'spooky', 'graveyard', 'horror', 'ghosts', 'spirits', 'crypt'],
    type: ObjectType.LOOP
  },
  {
    id: "222222",
    name: 'Carefree Whistling',
    tags: ['loop', 'music', 'tinkerer', 'happy', 'pleasant', 'cottage', 'cooking', 'guard'],
    type: ObjectType.LOOP
  },
  {
    id: "33333",
    name: 'The Jig of Slurs',
    tags: ['loop', 'music', 'tavern', 'upbeat', 'jovial', 'celtic', 'happy', 'pleasant', 'fiddle', 'flute', 'merry', 'halfling', 'village', 'town'],
    type: ObjectType.LOOP
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
        name: 'Ominous Ambience',
        id: '111111',
        source: { author: 'Alice', url: 'alice@alice.com' },
        type: 'LOOP',
        fileSource: 'ominous-ambience'
      }
    ]
  },
  {
    id: "2",
    // name: 'Crowded Tavern',
    tracks: [
      {
        name: 'Carefree Whistling',
        id: '222222',
        source: { author: 'Bob', url: 'bob@bob.com' },
        type: 'LOOP',
        fileSource: 'carefree-whistling'
      },
      {
        name: 'The Jig of Slurs',
        id: '33333',
        source: { author: 'Charlie', url: 'charlie@charlie.com' },
        type: 'LOOP',
        fileSource: 'jig-of-slurs'
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

export async function fetchTrackResults(searchText: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 400);
  });
  return DUMMY_TRACK_RESULT_DATA;
}

function trackFromTrackData(data: TrackData): Track | null {
  const { id, name, source, type, fileSource, fileSources } = data;
  switch (type) {
    case ObjectType.LOOP:
      if (fileSource === undefined) {
        console.error(`Server returned loop (id ${id}) with undefined fileSource.`);
        return null;
      }
      return {
        id,
        trackMetadata: { name, source },
        // TODO: volume and isMuted should be saved in the state
        volume: .6,
        isMuted: false,
        isPlaying: false,
        fileSource: fileSource
      } as Loop;
    case ObjectType.ONESHOT:
      if (fileSources?.length === undefined || fileSources.length === 0) {
        console.error(`Server returned oneshot (id ${id}) without fileSources.`);
        console.error(fileSources);
        return null;
      }
      return {
        id,
        trackMetadata: { name, source },
        // TODO: volume and isMuted should be saved in the state
        volume: .6,
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