import React from "react";
import { useDispatch } from "react-redux";
import useClonedTrackIds from "../../hooks/useClonedTrackIds";
import { Soundscape } from "../../models/Soundscape";
import { openSoundscape } from "../../slices/soundscapes";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import ChestBottom from "../../assets/chest-bottom.svg";
import ChestTop from "../../assets/chest-top.svg";

import "./SoundscapeListItem.scss";
import SoundscapeSummary from "../../widgets/SoundscapeSummary";
import VolumeControls from "../../widgets/VolumeControls";

type SoundscapeListItemProps = {
  soundscape: Soundscape
};

export default function SoundscapeListItem({ soundscape }: SoundscapeListItemProps) {
  const { sourceId, name, tracks, index: soundscapeIndex } = soundscape;
  const { isLoading } = useClonedTrackIds({
    sourceSoundscapeId: sourceId,
    currentTrackCount: tracks.length,
    soundscapeIndex
  });
  const dispatch = useDispatch();

  function open() {
    dispatch(openSoundscape({ soundscapeIndex }));
  }

  return (
    <div className="soundscape-list-item-container">
      <h4>{name}</h4>
      <DefaultButton onClick={open} text="Open" />
      <p>isLoading: {isLoading.toString()}</p>
      <div className="body">
        <VolumeControls
          initialVolume={0.7}  // TODO:
          isMuted={false} // TODO:
          setVolume={(newVol) => { console.log(newVol); }} // TODO:
          toggleIsMuted={() => { console.log('toggle muted'); }}
        />
        <div className="chest">
          <img
            className="chest-top"
            src={ChestTop}
            alt=""
          />
          <SoundscapeSummary tracks={tracks} />
          <img
            className="chest-bottom"
            src={ChestBottom}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}