import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

import { isOneShotData, TrackData } from '../../src/models/DatabaseTypes';
import { ObjectType } from '../../src/models/ObjectTypes';

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