# Database Files

`packs.json` and `tracks.json` contain metadata for all of TurboBard's packs and tracks, respectively.

## `process.js`

This file is included to facilitate bulk changes to the metadata, like reformatting or cleaning.

1. Make sure you have NodeJS installed locally.
2. Make changes to the `processElement()` function. Elements should be mutated directly, and this function doesn't need to return anything. Do not commit your changes to this function.
3. Make a new directory within `/database/` called `inputs`, and copy `packs.json` and `tracks.json` into it. These will act as inputs to `process.js` and won't be overwritten.
4. Navigate to `/database/` in a terminal.
5. Run `node process.js`. This will overwrite `/database/tracks.json` and `/database/packs.json`.
6. Commit the updated files and raise a PR!