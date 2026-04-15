import React, { useState, useEffect } from "react";
import { Knob } from 'primereact';

import Fill from "../fill/Fill.js";
import { useStore } from "../../utils/store.js";

import "./styles.css"

function Stroke() {
  const [width, setWidth] = useState(5);
  const canvas = useStore((state) => state.canvas);
  const selObj = useStore((state) => state.selObj);

  useEffect(() => {
    if (selObj) {
      setWidth(selObj.get("strokeWidth"));
    }

    return () => {
      setWidth(5);
    };
  }, [selObj]);

  function handleWidth(e) {
    setWidth(e.value);
    selObj.set("strokeWidth", e.value);
    canvas.requestRenderAll();
  }

  return (
    <p className="stroke">
      <Fill prop={"stroke"} />
      <label className="label">
      <Knob value={width} onChange={handleWidth} min={0} max={10} step={1}/>
      Ширина </label>
    </p>
  );
}

export default Stroke;
