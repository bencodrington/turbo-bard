import React from "react";
import logo from '../logo.svg';

import "./AppHeader.scss";

export default function AppHeader(props: any) {
  return (
    <div className="app-header-container">
      {/* TODO: <img src={logo} className="logo" alt="TurboBard logo" /> */}
      <h1 className="logotype">TurboBard</h1>
      {/* TODO: help button */}
    </div>
  );
}