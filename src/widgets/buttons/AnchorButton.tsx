import React from "react";

import "./AnchorButton.scss";

type AnchorButtonProps = {
  url: string
};

export default function AnchorButton({ url }: AnchorButtonProps) {
  return (
    <a
      className="anchor-button-container"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{url}</span>
    </a>
  );
}