import { TrackData } from "../models/DatabaseTypes";
import { ObjectType } from "../models/ObjectTypes";
import { SearchResult, UntypedSearchResult } from "../models/SearchResult";

export type SoundscapeChild = {
  id: string,
  volume: number,
  oneShotConfig?: {
    minSecondsBetween: number,
    maxSecondsBetween: number
  }
}

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

export async function fetchTrackResults(searchText: string) {
  const response = await fetch(`https://us-central1-turbo-bard.cloudfunctions.net/search?searchText=${searchText}`);
  const results = await response.json();
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
  const response = await fetch(`https://us-central1-turbo-bard.cloudfunctions.net/fetchTrackDataById?trackId=${trackId}`);
  const result = await response.json();
  return result as TrackData;
}