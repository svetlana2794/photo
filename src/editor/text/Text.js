import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faB, faItalic, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, ToggleButton, InputTextarea } from 'primereact';

import { useStore } from "../../utils/store.js";

import "./styles.css";

const font = ["Arial Narrow", "Monospace", "Italian Old Antiqua", "Buka Bird", "Futura", "Preciosa", "Sporefunkfont", "Tilda Script"
];

const func=async () => {
  	await document.fonts.load("Buka Bird");
    await document.fonts.load("Futura");
    await document.fonts.load("Preciosa");
    await document.fonts.load("Sporefunkfont");
    await document.fonts.load("Tilda Script");
    await document.fonts.load("Arial Narrow");
    await document.fonts.load("Italian Old Antiqua");
    }


function Text() {
  const canvas = useStore((state) => state.canvas);
  const selObj = useStore((state) => state.selObj);
  const [text, setText] = useState("text");
  const [family, setFamily] = useState("Times New Roman");
  const [checkBold, setCheckBold] = useState(false);
  const [checkItalic, setCheckItalic] = useState(false);
  const [checkUnder, setCheckUnder] = useState(false);

useEffect(() => {
func()
  }, [])

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
        }} className="textarea"
autoResize={false}/>
       
       <br />
      
      <Dropdown
        value={family}
  onChange={(e) => {
          setFamily(e.target.value);
          handleText("fontFamily", e.target.value)
        }}
  options={font}
  className="select"
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
  	paddingTop: "10px",
		paddingBottom: "10px",
		margin: "5px"
}
},
itemLabel: {
	style: {
border: "1px solid #4269ff"
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
  	paddingTop: "10px",
		paddingBottom: "10px",
		margin: "5px"
		}
},
itemLabel: {
	style: {
border: "1px solid #4269ff"
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
  	paddingTop: "10px",
		paddingBottom: "10px",
		margin: "5px"
}
},
itemLabel: {
	style: {
border: "1px solid #4269ff"
}
}
	}}/>
      
    </>
  );
}

export default Text;
