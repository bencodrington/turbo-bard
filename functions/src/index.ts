import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();
const soundscapesRef = db.collection('soundscapes');

const MAX_RESULTS = 10;

export const searchSoundscapes = functions.https.onRequest(async (request, response) => {
  const { query } = request;
  const searchText = query.searchText;
  functions.logger.info('searchSoundscapes');
  if (!searchText || searchText.length === 0) {
    functions.logger.info('Empty searchText, returning.');
    response.send([]);
  }
  functions.logger.info(searchText, { structuredData: true });
  const results = await soundscapesRef.where('tags', 'array-contains', searchText).limit(MAX_RESULTS).get();
  if (results.empty) {
    functions.logger.info('No soundscapes found for query "' + searchText + '".');
    response.send([]);
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