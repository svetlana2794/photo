import React, { useState, useEffect } from "react";

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
  const [checkThrough, setCheckThrough] = useState(false);
  const [checkOver, setCheckOver] = useState(false);

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
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          handleText(e);
        }}
        name="text"
      />
      <br />
      <label className="label">Шрифт: </label>
      <select
        name="fontFamily"
        onChange={(e) => {
          setFamily(e.target.value);
          handleText(e);
        }}
      >
        <option>Times New Roman</option>
        <option>Arial</option>
        <option>Monospace</option>
        <option>Comic Sans</option>
      </select>
      <br />
      <label style={{ backgroundColor: checkBold ? "#1949FF" : "#6988FF" }}>
        <input
          type="checkbox"
          value={!checkBold ? "bold" : "normal"}
          name="fontWeight"
          checked={checkBold}
          onChange={(e) => {
            setCheckBold(!checkBold);
            handleText(e);
          }}
        />
        Полужирный
      </label>
      <label style={{ backgroundColor: checkItalic ? "#1949FF" : "#6988FF" }}>
        <input
          type="checkbox"
          value={!checkItalic ? "italic" : "normal"}
          name="fontStyle"
          checked={checkItalic}
          onChange={(e) => {
            setCheckItalic(!checkItalic);
            handleText(e);
          }}
        />
        Курсив
      </label>
      <br />
      <label style={{ backgroundColor: checkUnder ? "#1949FF" : "#6988FF" }}>
        <input
          type="checkbox"
          name="underline"
          checked={checkUnder}
          onChange={(e) => {
            setCheckUnder(!checkUnder);
            handleDecor(e);
          }}
        />
        Подчеркнутый
      </label>
      <label style={{ backgroundColor: checkThrough ? "#1949FF" : "#6988FF" }}>
        <input
          type="checkbox"
          name="linethrough"
          checked={checkThrough}
          onChange={(e) => {
            setCheckThrough(!checkThrough);
            handleDecor(e);
          }}
        />
        Зачеркнутый
      </label>
      <label style={{ backgroundColor: checkOver ? "#1949FF" : "#6988FF" }}>
        <input
          type="checkbox"
          name="overline"
          checked={checkOver}
          onChange={(e) => {
            setCheckOver(!checkOver);
            handleDecor(e);
          }}
        />
        Надчеркнутый
      </label>
    </>
  );
}

export default Text;
