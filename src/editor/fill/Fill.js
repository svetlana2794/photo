import React, { useState, useEffect } from "react";
import { ColorPicker, Knob } from 'primereact';
import { Color } from "fabric";

import { useStore } from "../../utils/store.js";

function Fill({ prop }) {
  const [color, setColor] = useState("FFFFFF");
  const [alpha, setAlpha] = useState(1);
  const canvas = useStore((state) => state.canvas);
  const selObj = useStore((state) => state.selObj);

  useEffect(() => {
    if (selObj) {
      let color = new Color(selObj.get(prop));
      setColor(color.toHex());
      setAlpha(color.getAlpha());
    }

    return () => {
      setColor("FFFFFF");
      setAlpha(1);
    };
  }, [selObj]);

  function handleColor(e) {
    setColor(e.target.value);
    setFill({ c: e.target.value });
  }

  function handleAlpha(e) {
    setAlpha(e.value/10);
    setFill({ a: e.value/10 });
  }

  function setFill({ c = color, a = alpha }) {
    let col = new Color(c).toRgba();
    selObj.set(prop, col.replace(/1(?=\))/, a));
    canvas.requestRenderAll();
  }

  return (
    <>
      <label className="label">Цвет: </label>
      <ColorPicker value={color} onChange={handleColor} inline/>

      <br />
      <label className="label">Прозрачность: </label>
      <Knob value={alpha} onChange={handleAlpha} min={0/10} max={10/10} step={1/10}/>
      <br />
    </>
  );
}

export default Fill;
