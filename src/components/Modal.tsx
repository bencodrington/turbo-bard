import React, { ReactNode } from "react";

import "./Modal.scss";
import Button from "../widgets/buttons/Button";

type ModalProps = {
  className?: string,
  title: string,
  subtitle?: string | ReactNode,
  icon: string,
  iconColour?: string,
  children: ReactNode,
  onClose: () => void,
}

export default function Modal({ className, title, subtitle, icon, iconColour, children, onClose }: ModalProps) {

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLElement).closest(".modal") === null) {
      // Clicked outside modal
      onClose();
    }
    // Clicked inside modal, do nothing
  }

  return (
    <div className={`${className ?? ""} modal-container`} onClick={onClick}>
      <div className="modal">
        <header>
          <div className="icon-and-title">
            <i className={`fa fa-${icon}`} style={iconColour ? { color: iconColour } : undefined} />
            <div className="title-and-subtitle">
              <h2>{title}</h2>
              {
                subtitle === undefined
                  ? null
                  : typeof subtitle === "string"
                    ? <p className="subtitle">{subtitle}</p>
                    : subtitle
              }
            </div>
          </div>
          <Button
            onClick={onClose}
            icon="times"
          />
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}