import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rect, Circle, Triangle, FabricText } from "fabric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../tooltip/Tooltip.js";

import { useStore } from "../../utils/store.js";
import { addRect, addCircle, addTriangle, addText } from "../../utils/draw.js";

import "./styles.css";

function Panel({ hideForm, setHideForm, setShowBlock }) {
  const refLink = useRef(null);
  const canvas = useStore((state) => state.canvas);
  const changeSelObj = useStore((state) => state.changeSelObj);
  const navigate = useNavigate();

  function handleAdd(add, e) {
    let figure = add(canvas);
    figure.on("selected", function (options) {
      setHideForm(false);
      changeSelObj(options.target);

      if (
        options.target instanceof Rect ||
        options.target instanceof Circle ||
        options.target instanceof Triangle
      ) {
        setShowBlock({
          text: true,
          stroke: false,
          fill: false,
          brush: true,
        });
      }

      if (options.target instanceof FabricText) {
        setShowBlock({
          text: false,
          stroke: false,
          fill: false,
          brush: true,
        });
      }
    });

    canvas.add(figure);
    canvas.requestRenderAll();
  }

  function handleDraw() {
    canvas.isDrawingMode = true;
    setHideForm(false);
    setShowBlock({
      text: true,
      stroke: true,
      fill: true,
      brush: false,
    });
  }

  async function handleSave() {
    let link = canvas.toDataURL();
    let response = await fetch(link);
    let blob = await response.blob();
    refLink.current.href = URL.createObjectURL(blob);
    alert(refLink.current.href);
    refLink.current.click();
    navigate("/");
  }

  return (
    <div id="panel" style={{ display: !hideForm && "none" }}>
      <Link to={"/"}>
        Закрыть
        <FontAwesomeIcon icon={faClose} size="1x" color="#4269FF" />
      </Link>
      <button
        className="button"
        onClick={(e) => {
          handleAdd(addRect, e);
        }}
      >
        Прямоугольник
      </button>
      <button
        className="button"
        onClick={(e) => {
          handleAdd(addCircle, e);
        }}
      >
        Круг
      </button>
      <button
        className="button"
        onClick={(e) => {
          handleAdd(addTriangle, e);
        }}
      >
        Треугольник
      </button>
      <button
        className="button"
        onClick={(e) => {
          handleAdd(addText, e);
        }}
      >
        Текст
      </button>
      <button className="button" onClick={handleDraw}>
        Кисть
      </button>
      <button onClick={handleSave} className="save">
        Сохранить изображение
      </button>
      <a download={"image.png"} href={""} ref={refLink}></a>
      <Tooltip />
    </div>
  );
}

export default Panel;
