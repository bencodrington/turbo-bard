import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import Fuse from 'fuse.js';

import { isOneShotData, TrackData } from '../../src/models/DatabaseTypes';
import { ObjectType } from '../../src/models/ObjectTypes';
import { SearchResult } from '../../src/models/SearchResult';

const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();
const packsRef = db.collection('packs');
const tracksRef = db.collection('tracks');
const indexRef = db.collection('index');

const MAX_RESULTS = 25;

const fuseOptions: Fuse.IFuseOptions<SearchResult> = {
  minMatchCharLength: 2,
  ignoreLocation: true,
  threshold: 0.2,
  keys: [
    {
      name: "name",
      weight: 25
    },
    {
      name: "tags",
      weight: 1
    }
  ]
};

async function _search(searchText: string): Promise<SearchResult[]> {
  const index = await indexRef.doc('index').get();
  const {tracks, packs} = index.data() ?? {tracks: [], packs: []};
  const fuse = new Fuse([...tracks as SearchResult[], ...packs as SearchResult[]], fuseOptions);
  const fuseResults = fuse.search(searchText);
  return fuseResults.map(result => result.item).splice(0, MAX_RESULTS);
}

export const search = functions.https.onRequest(async (request, response) => {
  return cors()(request, response, async () => {
    const { query } = request;
    const searchText = query.searchText;
    functions.logger.info('search');
    if (!searchText || searchText.length === 0) {
      functions.logger.info('Empty searchText, returning.');
      response.send([]);
      return;
    }
    if (typeof searchText !== 'string') {
      functions.logger.info('Unsupported searchtext type "', typeof searchText, '", returning.');
      response.send([]);
      return;
    }
    functions.logger.info(searchText, { structuredData: true });
    const results = await _search(searchText);
    functions.logger.info(`${results.length} results found.`);
    response.send(results);
  });
});

export const fetchTrackDataById = functions.https.onRequest(async (request, response) => {
  return cors()(request, response, async () => {

    const { query } = request;
    const trackId = query.trackId;
    functions.logger.info('fetchTrackDataById');
    if (!trackId || trackId.length === 0) {
      functions.logger.info('Empty trackId, returning.');
      response.send({});
      return;
    }
    if (typeof trackId !== 'string') {
      functions.logger.info('Invalid trackId, returning.', trackId);
      response.send({});
      return;
    }
    functions.logger.info(trackId, { structuredData: true });
    const result = await tracksRef.doc(trackId).get();
    if (!result.exists) {
      functions.logger.info('No tracks found for trackId "' + trackId + '".');
      response.send({});
      return;
    }
    functions.logger.info(`Track with id "${trackId}" found.`);
    const trackData = result.data() as TrackData;
    const { name, source, tags } = trackData;
    if (isOneShotData(trackData)) {
      const track = {
        id: result.id,
        name,
        samples: trackData.samples,
        minSecondsBetween: trackData.minSecondsBetween,
        maxSecondsBetween: trackData.maxSecondsBetween,
        tags,
        source,
        type: ObjectType.ONESHOT
      };
      response.send(track);
      return;
    }
    const track = {
      id: result.id,
      name,
      fileName: trackData.fileName,
      tags,
      source,
      type: ObjectType.LOOP
    };
    response.send(track);
  });
});

// TODO: call this whenever the database is updated
export const createSearchIndex = functions.https.onRequest(async (request, response) => {
  return cors()(request, response, async () => {

    functions.logger.info('index packs');
    const packResults = await packsRef.get();
    let packs: SearchResult[] = [];
    if (packResults.empty) {
      functions.logger.info('No packs found in the packs index.');
    } else {
      functions.logger.info(`${packResults.size} packs found.`);
      packs = packResults.docs.map(doc => {
        const { name, tags, tracks } = doc.data();
        return {
          id: doc.id,
          name,
          tags,
          type: ObjectType.PACK,
          tracks
        };
      });
    }

    functions.logger.info('index tracks');
    let tracks: SearchResult[] = [];
    const trackResults = await tracksRef.get();
    if (trackResults.empty) {
      functions.logger.info('No tracks found in the tracks index.');
    } else {
      functions.logger.info(`${trackResults.size} tracks found.`);
      tracks = trackResults.docs.map(doc => {
        const { name, tags, type } = doc.data();
        return {
          id: doc.id,
          name,
          tags,
          type
        };
      });
    }
    indexRef.doc('index').set({ packs, tracks });
    response.status(200).send('success');
  });
});