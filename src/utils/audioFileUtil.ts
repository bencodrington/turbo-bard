export function createSourceSet(fileName: string) {
  return [
    `https://storage.googleapis.com/turbo-bard.appspot.com/${fileName}.webm`,
    `https://storage.googleapis.com/turbo-bard.appspot.com/${fileName}.mp3`
  ];
}