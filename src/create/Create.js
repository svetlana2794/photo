import React from "react";
import { Form } from "react-router-dom";

import "./styles.css";

function Create() {
  return (
    <div id="create">
      <h3>Размер холста</h3>
      <Form method="post">
        <label>Ширина: </label>
        <select name="width">
          <option>300</option>
          <option>400</option>
          <option>500</option>
          <option>600</option>
          <option>700</option>
          <option>800</option>
        </select>
        <br />
        <label>Высота: </label>
        <select name="height">
          <option>300</option>
          <option>400</option>
          <option>500</option>
          <option>600</option>
          <option>700</option>
          <option>800</option>
        </select>
        <br />
        <button>Создать</button>
      </Form>
    </div>
  );
}

export default Create;
