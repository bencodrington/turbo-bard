const fs = require('fs');

function processElement(element) {
  // ---------------------------------
  // Make changes to each element here
  // ---------------------------------
  // if (element.type === undefined) {
  //   console.log(element);
  // }
}

function writeFile(outputObject, fileName) {
  fs.writeFile(`./${fileName}.json`, JSON.stringify(outputObject), 'utf8', (err) => {
    if (err) throw err;
    console.log(`Successfully wrote ${fileName} JSON.`);
  });
}

function processFile(fileContents, fileName) {
  let outputObject = {};
  Object.keys(fileContents).forEach((key) => {
    const element = fileContents[key];
    processElement(element);
    outputObject[key] = element;
  });

  writeFile(outputObject, fileName);
}


function readFile(fileName) {
  fs.readFile(`./inputs/${fileName}.json`, function read(err, data) {
    if (err) {
      throw err;
    }
    console.log(`Successfully read ${fileName} JSON.`);
    const fileContents = JSON.parse(data);
    processFile(fileContents, fileName)
  });
}

['packs', 'tracks'].forEach(readFile);