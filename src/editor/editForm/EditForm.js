import React, { useState } from "react";

import Text from "../text/Text.js";
import Stroke from "../stroke/Stroke.js";
import Fill from "../fill/Fill.js";
import Brush from "../brush/Brush.js";
import Tooltip from "../tooltip/Tooltip.js";

import { useStore } from "../../utils/store.js";

import "./styles.css";

function EditForm({ hideForm, setHideForm, showBlock }) {
  const canvas = useStore((state) => state.canvas);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleRemove() {
    let arrElems = canvas.getObjects();
    let elem = canvas.item(arrElems.length - 1);
    canvas.remove(elem);
  }

  function handleApply() {
    setHideForm(true);
    canvas.isDrawingMode = false;
  }

  return (
    <form
      id="editForm"
      style={{ display: hideForm && "none" }}
      onSubmit={handleSubmit}
    >
      <fieldset hidden={showBlock.text} id="text">
        <legend>Текст</legend>
        <Text />
      </fieldset>
      <fieldset id="stroke" hidden={showBlock.stroke}>
        <legend>Контур</legend>
        <Stroke add={showBlock.add} />
      </fieldset>
      <fieldset id="fill" hidden={showBlock.fill}>
        <legend>Заливка</legend>
        <Fill prop={"fill"} />
      </fieldset>
      <fieldset id="brush" hidden={showBlock.brush}>
        <legend>Кисть</legend>
        <Brush />
      </fieldset>
      <div>
        <button onClick={handleRemove}>Удалить</button>
        <button onClick={handleApply}>Применить</button>
      </div>
      <Tooltip />
    </form>
  );
}

export default EditForm;
