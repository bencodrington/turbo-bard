# Database Files

`packs.json` and `tracks.json` contain metadata for all of TurboBard's packs and tracks, respectively.

## `process.js`

This file is included to facilitate bulk changes to the metadata, like reformatting or cleaning.

1. Make sure you have NodeJS installed locally.
2. Make changes to the `processElement()` function. Elements should be mutated directly, and this function doesn't need to return anything. Do not commit your changes to this function.
3. Make a new directory within `/database/` called `inputs`, and copy `packs.json` and `tracks.json` into it. These will act as inputs to `process.js` and won't be overwritten.
4. Navigate to `/database/` in a terminal.
5. Run `node process.js`. This will overwrite `/database/tracks.json` and `/database/packs.json`.
6. Format the newly-overwritten files with a JSON formatter so that the diff is more useful.
7. Commit the updated files and raise a PR!

### Deploying Changes to Firestore
This requires admin credentials for the project's firebase.

1. Install `node-firestore-import-export`.
```
npm i -g node-firestore-import-export
```
2. Get credentials from console.firebase.com:

`Project settings` > `Service accounts` > `Generate new private key`

3. Put the file (should start with `turbo-bard-firebase-adminsdk`) into this directory.

4. (If you want this update to remove entries) delete the collection from the Firestore UI.

5. From here, run:
```
// To deploy packs.json
firestore-import -a [turbo-bard-firebase-adminsdk-abc-123.json] -b packs.json -n packs
```
```
// To deploy tracks.json
firestore-import -a [turbo-bard-firebase-adminsdk-abc-123.json] -b tracks.json -n tracks
```