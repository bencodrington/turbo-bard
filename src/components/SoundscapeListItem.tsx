import React from "react";
import { Soundscape } from "../models/Soundscape";

type SoundscapeListItemProps = {
  data: Soundscape
};

export default function SoundscapeListItem ({data}: SoundscapeListItemProps) {
  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Track count: {data.tracks.length}</p>
    </div>
  );
}