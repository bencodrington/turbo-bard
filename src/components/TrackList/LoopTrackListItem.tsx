import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import { removeTrack, setTrackData } from "../../slices/soundscapes";
import useLoopPlayer from "../../hooks/useLoopPlayer";
import useBoolean from "../../hooks/useBoolean";
import { fetchTrackById } from "../../services/database";

// import "./LoopTrackListItem.scss";

type LoopTrackListItemProps = {
  loop: Loop | UnloadedTrack,
  soundscapeIndex: number,
  isVisible: boolean
};

// TODO: extract to util
function createSourceSet(fileSource: string) {
  return [
    `http://phanary.com/audio/converted/${fileSource}.webm`,
    `http://phanary.com/audio/converted/${fileSource}.mp3`
  ];
}

// TODO: start at volume zero and transition up to `volume`
export default function LoopTrackListItem({ soundscapeIndex, loop, isVisible }: LoopTrackListItemProps) {
  const sourceSet = isUnloaded(loop) ? [] : createSourceSet(loop.fileSource);
  const { name, id, index } = loop;

  const [isMuted, , toggleIsMuted] = useBoolean(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { isPlaying, toggleIsPlaying, isLoaded: isAudioLoaded } = useLoopPlayer(sourceSet);
  const dispatch = useDispatch();

  // TODO: extract to useTrackData hook (should be extensible to support oneshots)
  useEffect(() => {
    async function fetchData() {
      const trackData = await fetchTrackById(id);
      if (trackData === undefined) {
        setIsLoadingData(false);
        return;
      }
      dispatch(setTrackData({ soundscapeIndex, trackIndex: index, trackData }))
      setIsLoadingData(false);
    }
    if (isUnloaded(loop) && !isLoadingData) {
      setIsLoadingData(true);
      fetchData();
      // TODO: check for race conditions
    }
  }, [loop, isLoadingData, id, dispatch, index, soundscapeIndex]);
  if (!isVisible) {
    return null;
  }
  function displaySource() {
    console.log('TODO');
  }
  function remove() {
    dispatch(removeTrack({ soundscapeIndex, trackIndex: loop.index }))
  }
  return (
    <div>
      <p>{name}</p>
      {!isAudioLoaded ? <p>Loading...</p> : <p>Loaded</p>}
      {/* TODO: volume slider */}
      <DefaultButton
        onClick={toggleIsMuted}
        text={isMuted ? 'unmute' : 'mute'}
      />
      <DefaultButton
        onClick={toggleIsPlaying}
        text={isPlaying ? 'Stop' : 'Play'}
      />
      <DefaultButton
        onClick={displaySource}
        text="source"
      />
      <DefaultButton
        onClick={remove}
        text="x"
      />
    </div>
  );
}