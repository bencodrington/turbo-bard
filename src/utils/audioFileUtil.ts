export function getAudioFileUrl(fileName: string) {
  const useWebm = (new Audio().canPlayType('audio/webm; codecs="vorbis')) === "probably";
  const fileType = useWebm ? 'webm' : 'mp3';
  return `https://storage.googleapis.com/turbo-bard.appspot.com/${fileName}.${fileType}`;
}