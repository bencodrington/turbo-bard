import React, { useEffect, useRef, useState } from "react";
import useBoolean from "../hooks/useBoolean";

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

  function staticTextKeyHandler(event: React.KeyboardEvent<HTMLHeadingElement>) {
    switch (event.key) {
      case 'Enter':
        toggleIsEditModeActive();
        break;
      case ' ':
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
            onBlur={toggleIsEditModeActive}
          />
          : <h3
            className="static-text"
            tabIndex={0}
            onClick={toggleIsEditModeActive}
            onKeyDown={staticTextKeyHandler}
          > {text}</h3>
      }
    </div >
  );
}