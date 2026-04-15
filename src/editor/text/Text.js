import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faB, faItalic, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, ToggleButton, InputTextarea } from 'primereact';

import { useStore } from "../../utils/store.js";

import "./styles.css";

function Text() {
  const canvas = useStore((state) => state.canvas);
  const selObj = useStore((state) => state.selObj);
  const [text, setText] = useState("text");
  const [family, setFamily] = useState("Times New Roman");
  const [checkBold, setCheckBold] = useState(false);
  const [checkItalic, setCheckItalic] = useState(false);
  const [checkUnder, setCheckUnder] = useState(false);
  
  const font = ["Times New Roman", "Monospace", "Arial"];
  const options = [
        { icon: 'Кисть', value: 'underline' },
        { icon: 'Круги', value: 'linethrough' },
        { icon: 'Спрей', value: 'overline' }
    ];

  useEffect(() => {
    if (selObj) {
      setText(selObj.get("text"));
      setFamily(selObj.get("fontFamily"));
      setCheckBold(selObj.get("fontWeight") == "bold" ? true : false);
      setCheckItalic(selObj.get("fontStyle") == "italic" ? true : false);
      setCheckUnder(selObj.get("underline"));
      setCheckThrough(selObj.get("linethrough"));
      setCheckOver(selObj.get("overline"));
    }

    return () => {
      setText("text");
      setFamily("Times New Roman");
      setCheckBold(false);
      setCheckItalic(false);
      setCheckUnder(false);
      setCheckThrough(false);
      setCheckOver(false);
    };
  }, [selObj]);

  function handleText(e) {
    selObj.set(e.target.name, e.target.value);
    canvas.requestRenderAll();
  }

  function handleDecor(e) {
    selObj.set(e.target.name, e.target.checked);
    canvas.requestRenderAll();
  }

  return (
    <>
      <label className="label">Текст: </label>
      
      <InputTextarea value={text} onChange={(e) => {
          setText(e.target.value);
          handleText(e);
        }} name="text"/>
      
      <Dropdown
        value={family}
  onChange={(e) => {
          setFamily(e.target.value);
          handleText(e);
        }}
  options={font}
  className="select"
  name="fontFamily"
/>
      <br />
      
      <ToggleButton
  checked={checkBold}
  value={!checkBold ? "bold" : "normal"}
  onChange={(e) => {
            setCheckBold(!checkBold);
            handleText(e);
          }}
  onIcon={<FontAwesomeIcon icon={faB} />}
  offIcon={<FontAwesomeIcon icon={faB} />}
  name="fontWeight"
/>
      
      <ToggleButton
  checked={checkItalic}
   value={!checkItalic ? "italic" : "normal"}
  onChange={(e) => {
            setCheckItalic(!checkItalic);
            handleText(e);
          }}
  onIcon={<FontAwesomeIcon icon={faItalic} />}
  offIcon={<FontAwesomeIcon icon={faItalic} />}
  name="fontStyle"
/>
      
      <ToggleButton
  checked={checkUnder}
  onChange={(e) => {
            setCheckUnder(!checkUnder);
            handleDecor(e);
          }}
  onIcon={<FontAwesomeIcon icon={faUnderline} />}
  offIcon={<FontAwesomeIcon icon={faUnderline} />}
  name="underline"
/>
      
    </>
  );
}

export default Text;
