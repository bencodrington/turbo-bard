import React, { useEffect, useRef, useState } from "react";
import useBoolean from "../hooks/useBoolean";
import DefaultButton from "./buttons/DefaultButton";
import quillIcon from "../assets/icon-quill.svg";

import "./EditableHeader.scss";

type EditableHeaderProps = {
  initialText: string,
  onSave: (text: string) => void
};

export default function EditableHeader({ initialText, onSave }: EditableHeaderProps) {
  const [text, setText] = useState(initialText);
  const [isEditModeActive, , toggleIsEditModeActive] = useBoolean(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditModeActive) {
      onSave(text);
    }
  });

  useEffect(() => {
    if (isEditModeActive && inputRef.current !== null) {
      // Focus and highlight text whenever it becomes editable
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditModeActive]);

  function onInput(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'Enter':
        toggleIsEditModeActive();
        break;
      case 'Escape':
        setText(initialText);
        toggleIsEditModeActive();
        break;
    }
  }

  return (
    <div className="editable-header-container">
      {
        isEditModeActive
          ? <input
            type="text"
            value={text}
            ref={inputRef}
            onChange={e => setText(e.target.value)}
            onKeyDown={onInput}
          />
          : <h3 className="static-text">{text}</h3>
      }
      <DefaultButton
        onClick={toggleIsEditModeActive}
        className={"edit-button"}
        icon={quillIcon}
        iconAltText={isEditModeActive ? 'Save new name' : `Rename group ${text}`}
        isActive={isEditModeActive}
        isRound={true}
      />
    </div>
  );
}