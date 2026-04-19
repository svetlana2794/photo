import React, { useState } from "react";
import { Form } from "react-router-dom";
import { Dropdown } from 'primereact';


import "./styles.css";

function Create() {
	const size = [300, 400, 500, 600, 700, 800];
	const [selectedWidth, setSelectedWidth] = useState(300);
	const [selectedHeight, setSelectedHeight] = useState(300);

  return (
    <div className="create">
      <h3>Размер холста</h3>
      <Form method="post">
      <p>
        <Dropdown value={selectedWidth}
  onChange={(e) => setSelectedWidth(e.value)} name="width" options={size} className="size"/>
<span>px</span>
<span style={{fontSize: "2rem"}}><i class="pi pi-times"></i></span>
        <Dropdown
        value={selectedHeight}
  onChange={(e) => setSelectedHeight(e.value)}
  name="height"
  options={size}
  className="size"
/>
<span>px</span>
        </p>
        <button>Создать</button>
      </Form>
    </div>
  );
}

export default Create;
