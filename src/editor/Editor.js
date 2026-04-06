import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Canvas } from "fabric";

import Panel from "./panel/Panel.js";
import EditForm from "./editForm/EditForm.js";

import { useStore } from "../utils/store.js";

import "./styles.css";

function Editor() {
  const canvas = useStore((state) => state.canvas);
  const setCanvas = useStore((state) => state.setCanvas);
  const [hideForm, setHideForm] = useState(true);
  const [showBlock, setShowBlock] = useState({
    text: true,
    stroke: true,
    fill: true,
    brush: true,
  });
  const [tooltip, setTooltip] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const c = new Canvas("canvas", {
      width: +searchParams.get("width"),
      height: +searchParams.get("height"),
      backgroundColor: "white",
    });
    setCanvas(c);

    return () => {
      c.dispose();
    };
  }, []);

  return (
    <div id="editor">
      <div>
        <canvas id="canvas" />
      </div>
      <Panel
        hideForm={hideForm}
        setHideForm={setHideForm}
        setShowBlock={setShowBlock}
      />
      <EditForm
        hideForm={hideForm}
        setHideForm={setHideForm}
        showBlock={showBlock}
      />
    </div>
  );
}

export default Editor;
