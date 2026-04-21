import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faB, faItalic, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, ToggleButton, InputTextarea } from 'primereact';

import { useStore } from "../../utils/store.js";

import "./styles.css";

const font = [
{label: "Times New Roman", value: "Times New Roman"},
{label: "Monospace", value: "Monospace"}, 
{label: "Arial", value: "Arial"},
{label: "Buka Bird", value: "Buka Bird"},
{label: "Futura", value: "Futura"},
{label: "Kvadrat", value: "Kvadrat"},
{label: "Preciosa", value: "Preciosa"},
{label: "Sporefunkfont", value: "Sporefunkfont"},
{label: "Tilda Script", value: "Tilda Script"}
];

const optTemplate = (option) => {
  if (!option.value) {
    return option.label;
  } else {
    return (
        <span style={{ fontFamily: option.value}}>{option.label}</span>
    );
  }
};


function Text() {
  const canvas = useStore((state) => state.canvas);
  const selObj = useStore((state) => state.selObj);
  const [text, setText] = useState("text");
  const [family, setFamily] = useState("Times New Roman");
  const [checkBold, setCheckBold] = useState(false);
  const [checkItalic, setCheckItalic] = useState(false);
  const [checkUnder, setCheckUnder] = useState(false);

  useEffect(() => {
    if (selObj) {
      setText(selObj.get("text"));
      setFamily(selObj.get("fontFamily"));
      setCheckBold(selObj.get("fontWeight") == "bold" ? true : false);
      setCheckItalic(selObj.get("fontStyle") == "italic" ? true : false);
      setCheckUnder(selObj.get("underline"));
    }

    return () => {
      setText("text");
      setFamily("Times New Roman");
      setCheckBold(false);
      setCheckItalic(false);
      setCheckUnder(false);
    };
  }, [selObj]);

  function handleText(n, v) {
    selObj.set(n, v);
    canvas.requestRenderAll();
  }

  function handleDecor(n, c) {
    selObj.set(n, c);
    canvas.requestRenderAll();
  }

  return (
    <>
      <InputTextarea value={text} onChange={(e) => {
          setText(e.target.value);
          handleText("text", e.target.value);
        }} className="textarea"/>
       
       <br />
      
      <Dropdown
        value={family}
  onChange={(e) => {
          setFamily(e.target.value);
          handleText("fontFamily", e.target.value);
        }}
  options={font}
  className="select"
  itemTemplate={optTemplate} 
  pt={{
  item: {
    style: {
      padding: '5px',
      fontSize: '1rem'
    },
    trigger: {
    	marginRight: "-10px"
	}
  }
}}/>

<br/>
      
      <ToggleButton
      onLabel=""
        offLabel=""
  checked={checkBold}
  onChange={(e) => {
            setCheckBold(!checkBold);
            handleText("fontWeight", !checkBold ? "bold" : "normal");
          }}
  onIcon={<FontAwesomeIcon icon={faB} />}
  offIcon={<FontAwesomeIcon icon={faB} />} pt={{
  	root: {
  	style: {
		margin: "5px"
}
},
itemLabel: {
	style: {
border: 1px solid #4269ff;
}
}
	}}
/>
      
      <ToggleButton
      onLabel=""
        offLabel=""
  checked={checkItalic}
  onChange={(e) => {
            setCheckItalic(!checkItalic);
            handleText("fontStyle", !checkItalic ? "italic" : "normal");
          }}
  onIcon={<FontAwesomeIcon icon={faItalic} />}
  offIcon={<FontAwesomeIcon icon={faItalic} />} className="toggle" pt={{
  	root: {
  	style: {
		margin: "5px"
		}
},
itemLabel: {
	style: {
border: 1px solid #4269ff;
}
}
	}}/>
      
      <ToggleButton
      onLabel=""
        offLabel=""
  checked={checkUnder}
  onChange={(e) => {
            setCheckUnder(!checkUnder);
            handleDecor("underline", e.value);
          }}
  onIcon={<FontAwesomeIcon icon={faUnderline} />}
  offIcon={<FontAwesomeIcon icon={faUnderline} />} className="toggle" pt={{
  	root: {
  	style: {
		margin: "5px"
}
},
itemLabel: {
	style: {
border: 1px solid #4269ff;
}
}
	}}/>
      
    </>
  );
}

export default Text;
