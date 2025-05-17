import React from "react";

import "./AdjustTimingModal.scss";

import Modal from "../Modal";
import { OneShot } from "../../models/Track";
import Button from "../../widgets/buttons/Button";
import { useDispatch } from "react-redux";
import { setUserTriggeredPlayOnceNow } from "../../slices/oneShotStates";
import DurationSelectButton from "./DurationSelectButton";
import { setOneShotRange } from "../../slices/groups";

const playEveryNSecondsOptions = [1, 4, 6, 10, 15, 30, 60];
const giveOrTakeNSecondsOptions = [0, 1, 2, 5, 10, 15];

const getSelectedFrequencyOptions = (oneShot: OneShot) => {
  const giveOrTakeNSeconds =
    (oneShot.maxSecondsBetween - oneShot.minSecondsBetween) / 2;
  const playEveryNSeconds = oneShot.minSecondsBetween + giveOrTakeNSeconds;
  return {
    giveOrTakeNSeconds,
    playEveryNSeconds,
  };
};

const getMinAndMax = (
  playEveryNSeconds: number,
  giveOrTakeNSeconds: number
) => ({
  // Ensure minimum doesn't go below 0
  minSecondsBetween: Math.max(0, playEveryNSeconds - giveOrTakeNSeconds),
  maxSecondsBetween: playEveryNSeconds + giveOrTakeNSeconds,
});

const getSummarySentence = ({
  minSecondsBetween,
  maxSecondsBetween,
}: OneShot) => {
  if (minSecondsBetween === maxSecondsBetween) {
    return (
      <p className="summary">
        Play every <span className="big-numbers">{minSecondsBetween}</span>{" "}
        second
        {minSecondsBetween === 1 ? "" : "s"}.
      </p>
    );
  }
  return (
    <p className="summary">
      Play every <span className="big-numbers">{minSecondsBetween}</span> to{" "}
      <span className="big-numbers">{maxSecondsBetween}</span> seconds.
    </p>
  );
};

interface AdjustTimingModalProps {
  closeModal: () => void;
  oneShot: OneShot;
  oneShotTrackId: string;
  groupIndex: number;
}
export default function AdjustTimingModal({
  closeModal,
  oneShot,
  oneShotTrackId,
  groupIndex,
}: AdjustTimingModalProps) {
  const dispatch = useDispatch();
  const playNow = () => {
    dispatch(setUserTriggeredPlayOnceNow({ oneShotTrackId, newValue: true }));
  };

  const { playEveryNSeconds, giveOrTakeNSeconds } =
    getSelectedFrequencyOptions(oneShot);

  const onSelectPlayEveryNSecondsOption = (option: number) => {
    dispatch(
      setOneShotRange({
        groupIndex,
        trackIndex: oneShot.index,
        ...getMinAndMax(option, giveOrTakeNSeconds),
      })
    );
  };
  const onSelectGiveOrTakeNSecondsOption = (option: number) => {
    dispatch(
      setOneShotRange({
        groupIndex,
        trackIndex: oneShot.index,
        ...getMinAndMax(playEveryNSeconds, option),
      })
    );
  };

  return (
    <div className="adjust-timing-modal-container">
      <Modal
        title="Adjust Timing"
        subtitle={`${
          oneShot.name ?? undefined
        } lets you control how often it plays`}
        icon="clock"
        onClose={closeModal}
      >
        <div className="labelled-radio-buttons">
          <p className="label">Play every</p>
          <DurationSelectButton
            options={playEveryNSecondsOptions}
            onSelectOption={onSelectPlayEveryNSecondsOption}
            selectedOption={playEveryNSeconds}
          />
        </div>
        <div className="labelled-radio-buttons">
          <p className="label">give or take</p>
          <DurationSelectButton
            options={giveOrTakeNSecondsOptions}
            onSelectOption={onSelectGiveOrTakeNSecondsOption}
            selectedOption={giveOrTakeNSeconds}
          />
        </div>
        <hr />

        {getSummarySentence(oneShot)}

        <Button
          onClick={playNow}
          icon="play-circle"
          text="Play once right now"
          className="play-once-button"
        />
      </Modal>
    </div>
  );
}
