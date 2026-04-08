import React from "react";
import { Form } from "react-router-dom";
import { Dropdown } from 'dropdown.esm.js';


import "./styles.css";

function Create() {
	const size = [300, 400, 500, 600, 700, 800];

  return (
    <div id="create">
      <h3>Размер холста</h3>
      <Form method="post">
        <label>Ширина: </label>
        <Dropdown
  name="width"
  options={size}
/>
        <br />
        <label>Высота: </label>
        Dropdown
  name="height"
  options={size}
/>
        <br />
        <button>Создать</button>
      </Form>
    </div>
  );
}

export default Create;
