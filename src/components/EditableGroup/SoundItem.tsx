import React from "react";
import { useVolume } from "../../hooks/useVolume";
import { isOneShot, Track } from "../../models/Track";
import Button from "../../widgets/buttons/Button";
import VolumeControls from "../../widgets/VolumeControls";

import "./SoundItem.scss";
import DropdownMenu from "../../widgets/DropdownMenu";
import { useDispatch } from "react-redux";
import { removeTrack } from "../../slices/groups";
import { setUserTriggeredPlayOnceNow } from "../../slices/oneShotStates";

const HIDE_ON_DESKTOP_CLASS = "hide-on-desktop";

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
  const { name, index } = track;
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
    {
      icon: "info-circle",
      label: "Source",
      className: HIDE_ON_DESKTOP_CLASS,
      onClick: showSource,
    },
    { icon: "times", label: "Remove", onClick: remove },
  ];
  if (isOneShot(track)) {
    options.unshift({
      icon: "hourglass",
      label: "Adjust timing",
      className: HIDE_ON_DESKTOP_CLASS,
      onClick: showAdjustTimingModal,
    });
    options.unshift({
      icon: "play-circle",
      label: "Play now",
      className: HIDE_ON_DESKTOP_CLASS,
      onClick: playOnceRightNow,
    });
  }

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

      {
        // HACK: ensure that loop volume sliders aren't longer than one shot
        //  sliders on desktop. A better solution would use CSS grid.
        isOneShot(track) ? null : <div className="spacer show-on-desktop" />
      }
      {options
        .filter((option) => option.className === HIDE_ON_DESKTOP_CLASS)
        .map((option) => (
          <Button
            onClick={option.onClick}
            icon={option.icon}
            text={option.label}
            className="show-on-desktop"
            key={option.label}
          />
        ))}
      <Button onClick={toggleMenuOpen} icon="ellipsis-v" />
      {isMenuOpen && (
        <DropdownMenu
          className="sound-item-dropdown"
          closeDropdown={toggleMenuOpen}
          options={options}
        />
      )}
    </div>
  );
}
