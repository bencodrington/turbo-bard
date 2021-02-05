import React from "react";
import { useDispatch } from "react-redux";
import { removeTrack } from "../../slices/groups";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import TrackSource from "./TrackSource";
import moreIcon from "../../assets/icon-more.svg";
import closeIcon from "../../assets/icon-close.svg";

import "./ExpandedTrackItem.scss";

type ExpandedTrackItemProps = {
  name?: string,
  source?: {
    author?: string,
    urls: string[]
  },
  groupIndex: number,
  trackIndex: number,
  toggleIsExpanded: () => void,
  additionalExpandedControls?: JSX.Element
};

export default function ExpandedTrackItem({
  name,
  source,
  groupIndex,
  trackIndex,
  toggleIsExpanded,
  additionalExpandedControls
}: ExpandedTrackItemProps) {
  const dispatch = useDispatch();

  function remove() {
    dispatch(removeTrack({ groupIndex, trackIndex }))
  }

  return (
    <div className="expanded-track-item-container">
      <div className="left-column">
        <h4>{name ?? '...'}</h4>
        {additionalExpandedControls}
        <TrackSource source={source} />
      </div>
      <div className="right-column">
        <DefaultButton
          onClick={remove}
          icon={closeIcon}
        />
        <DefaultButton
          onClick={toggleIsExpanded}
          icon={moreIcon}
          isRound={true}
          isActive={true}
        />
      </div>
    </div>
  );
}