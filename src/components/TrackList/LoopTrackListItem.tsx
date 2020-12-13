import React from "react";
import { useDispatch } from "react-redux";
import { isUnloaded, Loop, UnloadedTrack } from "../../models/Track";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import { removeTrack } from "../../slices/soundscapes";
import useLoopPlayer from "../../hooks/useLoopPlayer";
import useBoolean from "../../hooks/useBoolean";
import useTrackData from "../../hooks/useTrackData";
import closeIcon from "../../assets/icon-close.svg";
import infoIcon from "../../assets/icon-info.svg";
import loopIcon from "../../assets/icon-loop.svg";
import playIcon from "../../assets/icon-play.svg";
import stopIcon from "../../assets/icon-stop.svg";

import "./LoopTrackListItem.scss";
import VolumeControls from "../../widgets/VolumeControls";

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
  const { isPlaying, toggleIsPlaying, isLoaded: isAudioLoaded } = useLoopPlayer(sourceSet);
  useTrackData(id, index, soundscapeIndex, !isUnloaded(loop));
  const dispatch = useDispatch();

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
    <div className="loop-track-list-item-container">
      <h4>{name ?? null}</h4>
      {!isAudioLoaded ? <p>Loading...</p> : <p>Loaded</p>}
      <div className='loop-controls'>
        <VolumeControls
          volume={0.7}
          isMuted={isMuted}
          setVolume={(volume) => { console.log(volume) }}
          toggleIsMuted={toggleIsMuted}
        />

        <div className='center-cell'>
          <DefaultButton
            className='play-toggle-button'
            onClick={toggleIsPlaying}
            icon={isPlaying ? stopIcon : playIcon}
          />
          <img className='loop-icon' src={loopIcon} alt='' />
        </div>

        <div className='standard-track-controls'>
          <DefaultButton
            onClick={remove}
            icon={closeIcon}
          />
          <DefaultButton
            onClick={displaySource}
            icon={infoIcon}
          />
        </div>
      </div>
    </div>
  );
}