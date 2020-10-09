import React from "react";
import { Soundscape } from "../models/Soundscape";

import "./SoundscapeListItem.scss";

type SoundscapeListItemProps = {
  data: Soundscape
};

export default function SoundscapeListItem ({data}: SoundscapeListItemProps) {
  return (
    <div className="soundscape-list-item-container">
      <h4>{data.name}</h4>
      <p>Track count: {data.tracks.length}</p>
    </div>
  );
}