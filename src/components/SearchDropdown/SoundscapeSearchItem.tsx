import React from "react";
import { Soundscape } from "../../models/Soundscape";

type SoundscapeSearchItemProps = {
  data: Soundscape,
  onClick: () => void
};

export default function SoundscapeSearchItem({ data, onClick }: SoundscapeSearchItemProps) {
  return (
    <li onClick={onClick}>
      {data.name}
    </li>
  );
}