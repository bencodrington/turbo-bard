import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

import { isOneShotData, TrackData } from '../../src/models/DatabaseTypes';
import { ObjectType } from '../../src/models/ObjectTypes';
import { SearchResult } from '../../src/models/SearchResult';

const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();
const packsRef = db.collection('packs');
const tracksRef = db.collection('tracks');

const MAX_RESULTS = 10;

async function _search(searchText: string): Promise<SearchResult[]> {
  // Split search text into words
  const words = searchText.split(' ');
  // Search packs
  const packResults = await packsRef.where('tags', 'array-contains-any', words).limit(MAX_RESULTS).get();
  functions.logger.info(`Query "${searchText}" returned ${packResults.docs.length} pack results.`);
  const packs = packResults.docs.map(doc => {
    const { name, tags, tracks } = doc.data();
    return {
      id: doc.id,
      name,
      tags,
      type: ObjectType.PACK,
      tracks
    };
  });
  // Search tracks
  const trackResults = await tracksRef.where('tags', 'array-contains-any', words).limit(MAX_RESULTS).get();
  functions.logger.info(`Query "${searchText}" returned ${trackResults.docs.length} track results.`);
  const tracks = trackResults.docs.map(doc => {
    const { name, tags, type } = doc.data();
    return {
      id: doc.id,
      name,
      tags,
      type
    };
  });
  const results = [...packs, ...tracks];
  if (results.length === 0) {
    functions.logger.info('No results found for query "' + searchText + '".');
  }
  return results;
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