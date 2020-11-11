import React from "react";
import { SoundscapeSearchResult } from "../../models/SoundscapeSearchResult";

type SoundscapeSearchItemProps = {
  data: SoundscapeSearchResult,
  onClick: () => void
};

export default function SoundscapeSearchItem({ data, onClick }: SoundscapeSearchItemProps) {
  return (
    <li onClick={onClick}>
      {data.name}
    </li>
  );
}