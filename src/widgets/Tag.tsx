import React from "react";

import "./Tag.scss";

type TagProps = {
  text: string
};

export default function Tag({ text }: TagProps) {
  return (
    <span className="tag-container">
      {text}
    </span>
  );
}