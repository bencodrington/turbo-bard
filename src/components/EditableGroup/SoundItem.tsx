import React from "react";
import { useVolume } from "../../hooks/useVolume";
import { isOneShot, Track } from "../../models/Track";
import Button, { ButtonType } from "../../widgets/buttons/Button";
import VolumeControls from "../../widgets/VolumeControls";

import "./SoundItem.scss";
import DropdownMenu from "../../widgets/DropdownMenu";
import { useDispatch } from "react-redux";
import { removeTrack } from "../../slices/groups";
import { setUserTriggeredPlayOnceNow } from "../../slices/oneShotStates";

type SoundItemProps = {
  track: Track;
  groupIndex: number;
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
  showSource: () => void;
  showAdjustTimingModal: () => void;
  trackInstanceId: string;
};

export default function SoundItem({
  track,
  groupIndex,
  isMenuOpen,
  toggleMenuOpen,
  showSource,
  showAdjustTimingModal,
  trackInstanceId,
}: SoundItemProps) {
  const { name, index, tags, id: trackId } = track;
  const { volume, setVolume } = useVolume({
    initialVolume: track.volume,
    isInitiallyMuted: false,
    groupIndex,
    trackIndex: index,
  });

  const dispatch = useDispatch();
  function remove() {
    toggleMenuOpen();
    dispatch(removeTrack({ groupIndex, trackIndex: index }));
  }
  function playOnceRightNow() {
    dispatch(
      setUserTriggeredPlayOnceNow({
        oneShotTrackId: trackInstanceId,
        newValue: true,
      })
    );
  }

  const options = [
    // { label: 'Replace', onClick: () => {/* TODO: ... */ } },
    { label: "Remove", onClick: remove },
  ];
  if (isOneShot(track)) {
    options.push({ label: "Play once right now", onClick: playOnceRightNow });
    options.push({ label: "Adjust timing", onClick: showAdjustTimingModal });
  }
  options.push({ label: "See source", onClick: showSource });

  return (
    <div className="sound-item-container">
      <div className="column">
        <span>{name}</span>
        <VolumeControls
          volume={volume}
          setVolume={setVolume}
          isMuted={false}
          toggleIsMuted={() => {}}
        />
      </div>
      <Button
        onClick={toggleMenuOpen}
        icon="ellipsis-v"
        type={ButtonType.Default}
      />
      {isMenuOpen && (
        <DropdownMenu
          className="sound-item-dropdown"
          closeDropdown={toggleMenuOpen}
          options={options}
        />
      )}
    </div>
    // <TrackItem
    //   isAudioReady={isAudioLoaded}
    //   volume={volume}
    //   setVolume={setVolume}
    //   groupIndex={groupIndex}
    //   trackIndex={loop.index}
    //   source={source}
    // />
  );
}
