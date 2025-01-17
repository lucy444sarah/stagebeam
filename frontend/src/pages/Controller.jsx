//This is the main app page. This file returns all the important components.

import { ObjectsMenu } from "../components/ObjectsMenu"
import { Timeline } from "../components/Timeline"
import { Workspace } from "../components/Workspace"
import { useEffect, useState } from "react";
import objectTemplates from "../data/objectTemplates.json"



export const Controller = () => {

  // Active Objects: They are aaaaaaaall going to live here:
  const [templateObjects, setTemplateObjects] = useState([]);
  //If activeObjects doesn't exist yet on local Storage, an empty array is written.
  const [activeObjects, setActiveObjects] = useState( 
    !localStorage.getItem('activeObjects')?[]:
    JSON.parse(localStorage.getItem('activeObjects') )) 
  // mostly for expanding it on the menu
  const [selected, setSelected] = useState(NaN);

  // Copying from file to state:
  useEffect(() => { setTemplateObjects(objectTemplates); }, []);


  // Copying state to localstorage
  useEffect(() => { localStorage.setItem('activeObjects',JSON.stringify(activeObjects)); }, [activeObjects]);

  //Maybe change overall layout to grid at some point

  return (
    <>
        <ObjectsMenu  activeObjects={activeObjects} setActiveObjects={setActiveObjects}  templateObjects={templateObjects} selected={selected} setSelected={setSelected}/>
        <Timeline/>
        <Workspace    activeObjects={activeObjects} setActiveObjects={setActiveObjects}  selected={selected} setSelected={setSelected}  /> {/*  order matters for overlap, ignoring the set z-index. Yes. Really. I hate it as well. /LZ */}
    </>
          )
}
