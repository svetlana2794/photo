import React, { useState, useEffect } from "react";
import { Knob, Button, Slider, ColorPicker } from 'primereact';
import { Color } from "fabric";


import { drawPencil, drawCircle, drawSpray } from "../../utils/drawBrush.js";

import { useStore } from "../../utils/store.js";

import "./styles.css";

function Brush() {
  const [brushObj, setBrushObj] = useState(null);
  const [value, setValue] = useState(null);
  const [color, setColor] = useState("FF0000");
  const [alpha, setAlpha] = useState(1);
  const [brushSize, setBrushSize] = useState(5);
  const canvas = useStore((state) => state.canvas);
  const selObj = useStore((state) => state.selObj);

  useEffect(() => {
    setBrushObj(null);
    setValue(null);
    setColor("FF0000");
    setAlpha(1);
    setBrushSize(5);
  }, [selObj]);

  function handleChange(v) {
    setColor("FF0000");
    setAlpha(1);
    setBrushSize(5);
    setValue(v);
    switch (v) {
      case "pencil":
        setBrushObj(drawPencil(canvas));
        break;
      case "circle":
        setBrushObj(drawCircle(canvas));
        break;
      case "spray":
        setBrushObj(drawSpray(canvas));
        break;
    }
  }

  function handleColor(e) {
    setColor(e.target.value);
    setFill({ c: e.target.value });
  }

  function handleAlpha(e) {
    setAlpha(+e.value.toFixed(2));
    setFill({ a: +e.value.toFixed(2) });
  }

  function setFill({ c = color, a = alpha }) {
    let col = new Color(c).toRgba();
    brushObj.color = col.replace(/1(?=\))/, a);
    canvas.requestRenderAll();
  }

  function handleSizeBrush(e) {
    setBrushSize(+e.value);
    brushObj.width = +e.value;
    canvas.requestRenderAll();
  }

  let style = {
    width: brushSize + "px",
    height: brushSize + "px",
    background: color,
    opacity: alpha,
  };

  return (
    <>
    <span className="p-buttonset">
<Button label="Кисть" onClick={handleChange("pencil")} />
<Button label="Круги" onClick={handleChange("circle")} />
<Button label="Спрей" onClick={handleChange("spray")} />

</span>
        
      <br />
     <label className="label">Цвет: </label>
      <ColorPicker value={color} onChange={handleColor} inline/>
      <br />
      <label className="label">Прозрачность: </label>
      <Knob value={alpha} onChange={handleAlpha} min={0} max={1} step={0.1}/>
      <br />
      <label className="label">Размер кисти: </label>
      
<Slider value={brushSize} onChange={handleSizeBrush} min={1} max={20} step={1}/>

      <span style={style} />
    </>
  );
}

export default Brush;
