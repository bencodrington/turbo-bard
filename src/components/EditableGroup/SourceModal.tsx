import React from "react";

import "./SourceModal.scss";
import Modal from "../Modal";
import { isUnloaded, Track } from "../../models/Track";

interface SourceModalProps {
  closeModal: () => void,
  track: Track
}
export default function SourceModal({ closeModal, track }: SourceModalProps) {
  const authorName = isUnloaded(track) ? '...' : track.source.author;
  const urls = isUnloaded(track) ? [] : track.source.urls;
  return (
    <div className="source-modal-container">
      <Modal title="Source" icon="info-circle" onClose={closeModal}>
        <div className="source-modal-content">
          {authorName !== undefined && <p>{authorName}</p>}
          {urls.length === null ? null : urls.map(url =>
            <a href={url}
              key={url}
              target="_blank"
              rel="noopener noreferrer">{url}</a>
          )}
        </div>
      </Modal>
    </div>
  )
}