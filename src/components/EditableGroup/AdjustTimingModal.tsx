import React from "react";

import Modal from "../Modal";
import { isUnloaded, OneShot } from "../../models/Track";
import Button from "../../widgets/buttons/Button";
import { useDispatch } from "react-redux";
import { playOneShotNow } from "../../slices/oneShotStates";

interface AdjustTimingModalProps {
  closeModal: () => void,
  oneShot: OneShot,
  oneShotTrackId: string,
}
export default function AdjustTimingModal({ closeModal, oneShot, oneShotTrackId }: AdjustTimingModalProps) {

  const dispatch = useDispatch();
  const playNow = () => {
    dispatch(playOneShotNow({ oneShotTrackId }))
  }
  return (
    <div className="adjust-timing-modal-container">
      <Modal title="Adjust Timing" subtitle={`${oneShot.name ?? undefined} lets you control how often it plays`} icon="clock" onClose={closeModal}>
        <div className="adjust-timing-modal-content">
          <Button onClick={playNow} icon="play-circle" text="Play once right now" />
        </div>
      </Modal>
    </div>
  )
}