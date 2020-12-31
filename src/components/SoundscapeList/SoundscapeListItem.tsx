import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useClonedTrackIds from "../../hooks/useClonedTrackIds";
import { Soundscape } from "../../models/Soundscape";
import {
  openSoundscape,
  removeSoundscape,
  setSoundscapeIsPlaying,
  setSoundscapeVolume
} from "../../slices/soundscapes";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import ChestBottom from "../../assets/chest-bottom.svg";
import ChestLidTop from "../../assets/chest-lid-top.svg";
import ChestLidBottom from "../../assets/chest-lid-bottom.svg";
import PlayIcon from "../../assets/icon-play.svg";
import StopIcon from "../../assets/icon-stop.svg";
import CloseIcon from "../../assets/icon-close.svg";
import SoundscapeSummary from "../../widgets/SoundscapeSummary";
import VolumeControls from "../../widgets/VolumeControls";


import "./SoundscapeListItem.scss";
import { isLoop, isOneShot } from "../../models/Track";
import { useVolume } from "../../hooks/useVolume";

type SoundscapeListItemProps = {
  soundscape: Soundscape
};

export default function SoundscapeListItem({ soundscape }: SoundscapeListItemProps) {
  const {
    sourceId,
    name,
    tracks,
    index: soundscapeIndex,
    volume: soundscapeVolume
  } = soundscape;
  useClonedTrackIds({
    sourceSoundscapeId: sourceId,
    currentTrackCount: tracks.length,
    soundscapeIndex
  });
  const dispatch = useDispatch();
  const onVolumeChanged = useCallback((newVolume: number) => {
    dispatch(setSoundscapeVolume({
      soundscapeIndex,
      volume: newVolume
    }));
  }, [dispatch, soundscapeIndex]);
  const {
    volume,
    setVolume,
    isMuted,
    toggleIsMuted
  } = useVolume({
    initialVolume: soundscapeVolume,
    onVolumeChanged
  });
  let isPlaying = false;
  tracks.forEach(track => {
    if (isLoop(track) || isOneShot(track)) {
      isPlaying = isPlaying || track.isPlaying;
    }
  })

  function open() {
    dispatch(openSoundscape({ soundscapeIndex }));
  }

  function remove() {
    dispatch(removeSoundscape({ soundscapeIndex }));
  }

  function toggleIsPlaying() {
    dispatch(setSoundscapeIsPlaying({ soundscapeIndex, isPlaying: !isPlaying }));
  }

  return (
    <div className="soundscape-list-item-container">
      <h4>{name}</h4>
      <div className="body">
        <VolumeControls
          volume={volume}
          isMuted={isMuted}
          setVolume={setVolume}
          toggleIsMuted={toggleIsMuted}
        />
        <div className="chest">
          <div
            className="chest-lid"
            onClick={open}
          >
            <img
              className="chest-lid-top"
              src={ChestLidTop}
              alt=""
            />
            <img
              className="chest-lid-bottom"
              src={ChestLidBottom}
              alt=""
            />
          </div>
          <SoundscapeSummary tracks={tracks} />
          <img
            className="chest-bottom"
            src={ChestBottom}
            alt=""
          />
          <div className="play-buttons">
            <DefaultButton
              onClick={toggleIsPlaying}
              icon={isPlaying ? StopIcon : PlayIcon}
            />
            {/* TODO: lock button */}
          </div>
        </div>
        <DefaultButton
          className="close-button"
          onClick={remove}
          icon={CloseIcon}
        />
      </div>
    </div>
  );
}