import React from "react";
import { Link } from "react-router-dom";

import { useStore } from "../utils/store.js";

import "./styles.css";

function Start() {
  return (
    <div id="start">
      <h2>Добро пожаловать!</h2>
      <Link to={"/create"}>Начать</Link>
    </div>
  );
}

export default Start;
