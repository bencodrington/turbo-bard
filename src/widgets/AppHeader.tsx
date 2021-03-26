import React from "react";
import logo from '../logo.svg';
import questionMarkIcon from "../assets/icon-question-mark.svg";
import backIcon from "../assets/icon-back.svg";

import "./AppHeader.scss";
import DefaultButton from "./buttons/DefaultButton";

type AppHeaderProps = {
  isAboutOpen: boolean,
  setIsAboutOpen: (newValue: boolean) => void
};

export default function AppHeader({
  isAboutOpen,
  setIsAboutOpen
}: AppHeaderProps) {
  const className = 'app-header-container' +
    (isAboutOpen ? ' about-open' : '');
  return (
    <div className={className}>
      {isAboutOpen && <DefaultButton
        icon={backIcon}
        iconAltText="Back arrow"
        onClick={() => setIsAboutOpen(false)}
      />}
      <img src={logo} className="logo" alt="TurboBard logo" />
      {!isAboutOpen && <DefaultButton
        icon={questionMarkIcon}
        iconAltText="About TurboBard"
        isRound={true}
        onClick={() => setIsAboutOpen(true)}
      />}
    </div>
  );
}