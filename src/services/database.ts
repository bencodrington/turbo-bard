import { TrackData } from "../models/DatabaseTypes";
import { SearchResult } from "../models/SearchResult";

export async function fetchSearchResults(searchText: string) {
  // const response = await fetch(`http://localhost:5001/turbo-bard/us-central1/search?searchText=${searchText}`);
  const response = await fetch(`https://us-central1-turbo-bard.cloudfunctions.net/search?searchText=${searchText}`);
  const results = await response.json();
  return results as SearchResult[];
}

export async function fetchTrackDataById(trackId: string) {
  const response = await fetch(`https://us-central1-turbo-bard.cloudfunctions.net/fetchTrackDataById?trackId=${trackId}`);
  const result = await response.json();
  return result as TrackData;
}