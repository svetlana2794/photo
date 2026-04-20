import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

function Tooltip() {
  const [toolShow, setToolShow] = useState(false);

  return (
    <>
      <button
        id="help"
        onClick={() => {
          setToolShow(!toolShow);
        }}
      >
        <FontAwesomeIcon icon={faQuestion} size="2x" color="#4269FF" />
        <div className="tooltip" style={{ display: toolShow && "block" }}>
          <p>Нажмите на фигуру для редактирования.</p>
          <p>Для удаления фигуры выделите ее и нажмите клавишу <mark>Delete</mark></p>
          <p>Для копирования фигуры выделите ее, нажмите <mark>Ctrl</mark>+<mark>C</mark>, затем <mark>Ctrl</mark>+<mark>V</mark></p>
          <p>Для масштабирования фигуры используйте клавиши <mark>+</mark> и <mark>-</mark></p>
          <p>
            В режиме рисования кистью удерживайте клавишу <mark>Shift</mark>, чтобы нарисовать прямую линию.
          </p>
        </div>
      </button>
    </>
  );
}

export default Tooltip;
