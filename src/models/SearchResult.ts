import { ObjectType } from "../models/ObjectTypes";

export type SearchResult = UntypedSearchResult & {
  type: ObjectType
};

export type UntypedSearchResult = {
  id: string,
  name: string,
  tags: string[],
  packSummary?: {
    loopCount: number,
    oneShotCount: number
  }
};