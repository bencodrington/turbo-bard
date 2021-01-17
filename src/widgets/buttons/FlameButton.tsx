import React from "react";
import playIcon from "../../assets/icon-play.svg";
import stopIcon from "../../assets/icon-stop.svg";
import flame from "../../assets/flame.svg";

import "./FlameButton.scss";

type FlameButtonProps = {
  isPlaying: boolean,
  isDisabled?: boolean,
  onClick: () => void
};

export default function FlameButton({
  isPlaying,
  onClick,
  isDisabled = false
}: FlameButtonProps) {
  const ariaLabel = (isPlaying ? "Play" : "Stop") + " button";
  return (
    <button
      className="flame-button-container"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <img
        className="icon"
        src={isPlaying ? stopIcon : playIcon}
        alt=""
      />
      <img
        className="background"
        src={flame}
        alt=""
      />
    </button>
  );
}