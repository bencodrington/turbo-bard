import { ObjectType } from "../models/ObjectTypes";
import { SearchResult } from "../models/SearchResult";
import { Loop, OneShot, Track, TrackMetadata } from "../models/Track";

export type LoopData = {
  id: string,
  type: ObjectType.LOOP
  fileSource: string
} & TrackMetadata;

export type OneShotData = {
  id: string,
  type: ObjectType.ONESHOT
  trackMetadata: TrackMetadata,
  fileSources: string[]
} & TrackMetadata;


export type TrackData = LoopData | OneShotData;

export function isLoopData(trackData: TrackData): trackData is LoopData {
  return (trackData as LoopData).fileSource !== undefined &&
    trackData.type === ObjectType.LOOP;
}

export function isOneShotData(trackData: TrackData): trackData is OneShotData {
  return (trackData as OneShotData).fileSources !== undefined &&
    trackData.type === ObjectType.ONESHOT;
}

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

const DUMMY_TRACK_DATA: (LoopData | OneShotData)[] = [
  {
    id: '111111',
    type: ObjectType.LOOP,
    fileSource: 'ominous-ambience',
    name: 'Ominous Ambience',
    source: { author: 'Alice', url: 'alice@alice.com' },
    tags: ['loop', 'spooky', 'graveyard', 'horror', 'ghosts', 'spirits', 'crypt']
  },
  {
    id: '222222',
    type: ObjectType.LOOP,
    fileSource: 'carefree-whistling',
    name: 'Carefree Whistling',
    source: { author: 'Bob', url: 'bob@bob.com' },
    tags: ['loop', 'music', 'tinkerer', 'happy', 'pleasant', 'cottage', 'cooking', 'guard'],
  },
  {
    id: '33333',
    type: ObjectType.LOOP,
    fileSource: 'jig-of-slurs',
    name: 'The Jig of Slurs',
    source: { author: 'Charlie', url: 'charlie@charlie.com' },
    tags: ['loop', 'music', 'tavern', 'upbeat', 'jovial', 'celtic', 'happy', 'pleasant', 'fiddle', 'flute', 'merry', 'halfling', 'village', 'town'],
  }
];

type SoundscapeData = { id: string, tracks: TrackData[] }
// type TrackData = { id: string, type: string, fileSource?: string, fileSources?: string[] } & TrackMetadata;

const DUMMY_SOUNDSCAPE_DATA: SoundscapeData[] = [
  {
    id: "1",
    // name: 'Graveyard',
    tracks: [
      {
        name: 'Ominous Ambience',
        id: '111111',
        source: { author: 'Alice', url: 'alice@alice.com' },
        type: ObjectType.LOOP,
        fileSource: 'ominous-ambience',
        tags: ['loop', 'spooky', 'graveyard', 'horror', 'ghosts', 'spirits', 'crypt']
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
        type: ObjectType.LOOP,
        tags: ['loop', 'music', 'tinkerer', 'happy', 'pleasant', 'cottage', 'cooking', 'guard'],
        fileSource: 'carefree-whistling'
      },
      {
        name: 'The Jig of Slurs',
        id: '33333',
        source: { author: 'Charlie', url: 'charlie@charlie.com' },
        type: ObjectType.LOOP,
        tags: ['loop', 'music', 'tavern', 'upbeat', 'jovial', 'celtic', 'happy', 'pleasant', 'fiddle', 'flute', 'merry', 'halfling', 'village', 'town'],
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

function trackFromTrackData(trackData: TrackData): Track | null {
  const { id, name, source } = trackData;
  if (isLoopData(trackData)) {
    return {
      id,
      name,
      source,
      // TODO: volume and isMuted should be saved in the state
      volume: .6,
      isMuted: false,
      isPlaying: false,
      fileSource: trackData.fileSource
    } as Loop;
  }
  if (isOneShotData(trackData)) {
    return {
      id,
      name,
      source,
      // TODO: volume and isMuted should be saved in the state
      volume: .6,
      isMuted: false,
      isPlaying: false,
      fileSources: trackData.fileSources
    } as OneShot;
  }
  console.error('Server returned invalid trackData:', trackData);
  return null;
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

export async function fetchTrackById(trackId: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 400);
  });
  return DUMMY_TRACK_DATA.find(track => track.id === trackId);
}