import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Canvas } from "fabric";

import Panel from "./panel/Panel.js";
import EditForm from "./editForm/EditForm.js";

import { useStore } from "../utils/store.js";

import "./styles.css";

function Editor() {
  const canvas = useStore((state) => state.canvas);
  const setCanvas = useStore((state) => state.setCanvas);
  const selObj = useStore((state) => state.selObj);
  const [hideForm, setHideForm] = useState(true);
  const [showBlock, setShowBlock] = useState({
    text: true,
    stroke: true,
    fill: true,
    brush: true,
  });
  const [tooltip, setTooltip] = useState(true);
  const refCanvas=useRef(null)
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const c = new Canvas("canvas", {
      width: +searchParams.get("width"),
      height: +searchParams.get("height"),
      backgroundColor: "white",
    });
    setCanvas(c);
    
    refCanvas.current.addEventListener("keydown", function(e) {
    let copyObj=null
if (!selObj) return

if (e.key== "Delete") {
	canvas.remove(selObj)
	}

if (e.ctrlKey && e.key=="c") {
	selObj.clone(function(clonedObj) {
		copyObj=clonedObj
		copyObj.set({
			top: copyObj.top.10,
			left: copyObj.left+10
			})
		})
	}
	
if (e.ctrlKey && e.key=="v") {
	copyObjclone(function(clonedObj) {
		clonedObj.set({
			top: clonedObj.top+10,
			left: clonedObj.left+10
			})
			canvas.add(clonedObj)
		})
	canvas.seyActiveObject(clonedObj)
	}

if (e.key== "+") {
	if (selObj.scaleX*1.1>5) return
	if (selObj.scaleX*0.9<0.1) return
	const center=selObj.getCenterPoint()
	selObj.scaleX*=1.1
	selObj.scaleY*=1.1
	const newCenter=selObj.getCenterPoint()
	selObj.top+=center.y-newCenter.y
	selObj.left+=center.x-newCenter.x
	selObj.setCoords()
	}
	
if (e.key== "-") {
	if (selObj.scaleX*1.1>5) return
	if (selObj.scaleX*0.9<0.1) return
	const center=selObj.getCenterPoint()
	selObj.scaleX*=0.9
	selObj.scaleY*=0.9
	const newCenter=selObj.getCenterPoint()
	selObj.top+=center.y-newCenter.y
	selObj.left+=center.x-newCenter.x
	selObj.setCoords()
	}
	canvas requestRenderAll()
})

    return () => {
      c.dispose();
    };
  }, []);

  return (
    <div id="editor">
      <div>
        <canvas id="canvas" ref={refCanvas}/>
      </div>
      <Panel
        hideForm={hideForm}
        setHideForm={setHideForm}
        setShowBlock={setShowBlock}
      />
      <EditForm
        hideForm={hideForm}
        setHideForm={setHideForm}
        showBlock={showBlock}
      />
    </div>
  );
}

export default Editor;
