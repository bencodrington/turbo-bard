import React from "react";
import logo from '../logo.svg';
import { useOpenSoundscape } from "../slices";

import "./AppHeader.scss";

export default function AppHeader() {
  const openSoundscape = useOpenSoundscape();
  const className = 'app-header-container' +
    (openSoundscape !== undefined ? ' hidden--mobile' : '');
  return (
    <div className={className}>
      <img src={logo} className="logo" alt="TurboBard logo" />
      {/* TODO: help button */}
    </div>
  );
}