import { ObjectType } from "../models/ObjectTypes";
import { SearchResult, UntypedSearchResult } from "../models/SearchResult";
import { TrackMetadata } from "../models/Track";

export const ERROR_TYPE = 'ERROR';

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

export type TrackDataError = {
  id: string,
  type: typeof ERROR_TYPE
}

export type SoundscapeChild = {
  id: string,
  volume: number,
  oneShotConfig?: {
    minSecondsBetween: number,
    maxSecondsBetween: number
  }
}

export type TrackData = TrackDataError | LoopData | OneShotData;

export function isLoopData(trackData: TrackData): trackData is LoopData {
  return (trackData as LoopData).fileSource !== undefined &&
    trackData.type === ObjectType.LOOP;
}

export function isOneShotData(trackData: TrackData): trackData is OneShotData {
  return (trackData as OneShotData).fileSources !== undefined &&
    trackData.type === ObjectType.ONESHOT;
}

// const DUMMY_SOUNDSCAPE_RESULT_DATA: SearchResult[] = [
//   {
//     id: 'XXXXX',
//     name: 'Graveyard',
//     tags: ['spooky', 'scary', 'eerie', 'haunted', 'ghosts', 'spirits', 'cemetery', 'crypt'],
//     type: ObjectType.SOUNDSCAPE
//   },
//   {
//     id: 'YYYYY',
//     name: 'Crowded Tavern',
//     tags: ['lively', 'ale', 'beer', 'inn', 'warm', 'cozy', 'busy', 'happy', 'drinks', 'merry'],
//     type: ObjectType.SOUNDSCAPE
//   }
// ];

// const DUMMY_TRACK_RESULT_DATA: SearchResult[] = [
//   {
//     id: "111111",
//     name: 'Ominous Ambience',
//     tags: ['loop', 'spooky', 'graveyard', 'horror', 'ghosts', 'spirits', 'crypt'],
//     type: ObjectType.LOOP
//   },
//   {
//     id: "222222",
//     name: 'Carefree Whistling',
//     tags: ['loop', 'music', 'tinkerer', 'happy', 'pleasant', 'cottage', 'cooking', 'guard'],
//     type: ObjectType.LOOP
//   },
//   {
//     id: "333333",
//     name: 'The Jig of Slurs',
//     tags: ['loop', 'music', 'tavern', 'upbeat', 'jovial', 'celtic', 'happy', 'pleasant', 'fiddle', 'flute', 'merry', 'halfling', 'village', 'town'],
//     type: ObjectType.LOOP
//   }
// ];

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
    id: '333333',
    type: ObjectType.LOOP,
    fileSource: 'jig-of-slurs',
    name: 'The Jig of Slurs',
    source: { author: 'Charlie', url: 'charlie@charlie.com' },
    tags: ['loop', 'music', 'tavern', 'upbeat', 'jovial', 'celtic', 'happy', 'pleasant', 'fiddle', 'flute', 'merry', 'halfling', 'village', 'town'],
  }
];

type SoundscapeData = { id: string, tracks: SoundscapeChild[] }

const DUMMY_SOUNDSCAPE_DATA: SoundscapeData[] = [
  {
    id: 'XXXXX',
    // name: 'Graveyard',
    tracks: [{ id: '111111', volume: 0.3 }]
  },
  {
    id: 'YYYYY',
    // name: 'Crowded Tavern',
    tracks: [
      { id: '222222', volume: 0.5 },
      { id: '333333', volume: 0.5 }
    ]
  }
];

function toSearchResult(unidentified: UntypedSearchResult, type: ObjectType): SearchResult {
  const { id, name, tags } = unidentified;
  return {
    id,
    name,
    tags,
    type
  };
}

export async function fetchSoundscapeResults(searchText: string) {
  const response = await fetch(`https://us-central1-turbo-bard.cloudfunctions.net/searchSoundscapes?searchText=${searchText}`);
  const results = await response.json();
  results.map((soundscape: UntypedSearchResult) => toSearchResult(soundscape, ObjectType.SOUNDSCAPE));
  return results as SearchResult[];
}

type TrackResult = UntypedSearchResult & { trackType: string };

export async function fetchTrackResults(searchText: string) {
  const response = await fetch(`https://us-central1-turbo-bard.cloudfunctions.net/searchTracks?searchText=${searchText}`);
  const results = await response.json();
  results.map((track: TrackResult) => {
    const type = track.trackType === ObjectType.ONESHOT ? ObjectType.ONESHOT : ObjectType.LOOP;
    return toSearchResult(track, type);
  });
  return results as SearchResult[];
}

export async function fetchUnloadedTracksForSoundscape(soundscapeId: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 400);
  });
  const tracks = DUMMY_SOUNDSCAPE_DATA.find(result => result.id === soundscapeId)?.tracks;
  if (tracks === undefined) {
    return [];
  }
  return tracks;
}

export async function fetchTrackDataById(trackId: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 400);
  });
  return DUMMY_TRACK_DATA.find(track => track.id === trackId);
}