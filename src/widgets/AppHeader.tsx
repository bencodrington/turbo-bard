import React from "react";
import logo from '../logo.svg';

import "./AppHeader.scss";

export default function AppHeader(props: any) {
  return (
    <div className="app-header-container">
      <img src={logo} className="logo" alt="TurboBard logo" />
      {/* TODO: help button */}
    </div>
  );
}