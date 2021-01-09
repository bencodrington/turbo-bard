import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();
const soundscapesRef = db.collection('soundscapes');
const tracksRef = db.collection('tracks');

const MAX_RESULTS = 10;

export const searchSoundscapes = functions.https.onRequest(async (request, response) => {
  return cors()(request, response, async () => {

    const { query } = request;
    const searchText = query.searchText;
    functions.logger.info('searchSoundscapes');
    if (!searchText || searchText.length === 0) {
      functions.logger.info('Empty searchText, returning.');
      response.send([]);
      return;
    }
    functions.logger.info(searchText, { structuredData: true });
    const results = await soundscapesRef.where('tags', 'array-contains', searchText).limit(MAX_RESULTS).get();
    if (results.empty) {
      functions.logger.info('No soundscapes found for query "' + searchText + '".');
      response.send([]);
      return;
    }
    functions.logger.info(`Query "${searchText}" returned ${results.docs.length} results.`);
    const soundscapes = results.docs.map(doc => {
      const { name, tags } = doc.data();
      return {
        id: doc.id,
        name,
        tags
      };
    });
    response.send(soundscapes);
  });
});

export const searchTracks = functions.https.onRequest(async (request, response) => {
  return cors()(request, response, async () => {

    const { query } = request;
    const searchText = query.searchText;
    functions.logger.info('searchTracks');
    if (!searchText || searchText.length === 0) {
      functions.logger.info('Empty searchText, returning.');
      response.send([]);
      return;
    }
    functions.logger.info(searchText, { structuredData: true });
    const results = await tracksRef.where('tags', 'array-contains', searchText).limit(MAX_RESULTS).get();
    if (results.empty) {
      functions.logger.info('No tracks found for query "' + searchText + '".');
      response.send([]);
      return;
    }
    functions.logger.info(`Query "${searchText}" returned ${results.docs.length} results.`);
    const tracks = results.docs.map(doc => {
      const { name, tags, samples } = doc.data();
      const trackType = samples === undefined ? 'LOOP' : 'ONESHOT';
      return {
        id: doc.id,
        name,
        tags,
        trackType
      };
    });
    response.send(tracks);
  });
});