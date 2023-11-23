import { useEffect, useRef, useState } from "react";
import { ObjectCreator } from "./ObjectCreator";


// Main function
export const Workspace = ({ activeObjects, setActiveObjects}) => {

 //States
    // Relative Coords
    const [relCoords, setrelCoords] = useState({
        rx: 0.5,
        ry: 0.5,
    });
    // Aspect Ratio of the window the beamer is in
    const [projectionAspectRatio, setProjectionAspectRatio] = useState(1);
    // Pink box dimensions
    const [stageDimensions, setStageDimensions] = useState();
    // h-full active or not for the pink box
    const [aspectToggle, setAspectToggle]=useState(false);


 //References
      const stageContainer = useRef();
      const workspace = useRef();


 // This function mirrors the localstorage contents of certain keys to states
    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'relCoords') {
            setrelCoords(JSON.parse(newValue));
        } else if (key ==='projectionAspectRatio'){
            setProjectionAspectRatio(newValue);
        }
    };

 //Event Listener, listening to storage updates
    useEffect(() => {
        setProjectionAspectRatio(
            localStorage.getItem('projectionAspectRatio') ?? 2
        );
        setrelCoords(
            localStorage.getItem('relCoords') ?? { rx: 0.5, ry: 0.5,}
        );
        window.addEventListener('storage', onStorageUpdate);
        return () => {
        window.removeEventListener('storage', onStorageUpdate);
        };
    }, []);

    useEffect(() => { console.log("Hi from Workspace! activeObjects",activeObjects) }, [ activeObjects]);

  // Toggling aspectToggle depending on whether the pink border box (stage) fits in the black box (workspace)
    useEffect(() => {
        setStageDimensions(stageContainer.current.getBoundingClientRect());
        let x=workspace.current.getBoundingClientRect();
        if ((x.width/x.height)>projectionAspectRatio){setAspectToggle(true) } else setAspectToggle(false);
    }, [projectionAspectRatio, aspectToggle]);

  // Resize Handler, writing the new sizes and toggling AspectToggle
      useEffect(() => {
        const handleResize = () => {
            let x=workspace.current.getBoundingClientRect();
            if ((x.width/x.height)>projectionAspectRatio){setAspectToggle(true) } else setAspectToggle(false);
            setStageDimensions(stageContainer.current.getBoundingClientRect());
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [projectionAspectRatio, aspectToggle]);
   
    return (
        <div ref={workspace} className='fixed bg-black text-white top-[3vh] h-[67vh] left-[30vw] w-[70vw] border-2 overflow-visible /* group/canvas */ z-1  ' >

            <h1 className='absolute text-gray-700 p-2 text-xl'>Workspace</h1>

            <div  ref={stageContainer} className={`relative bg-transparent border-2 border-pink-500 ${aspectToggle && 'h-full'} z-30`} style={{aspectRatio:projectionAspectRatio}}>
                <div className="relative flex flex-wrap w-full h-full justify-end content-end text-gray-500 p-1"><p> beamer aspect ratio: {parseFloat(projectionAspectRatio).toFixed(2)}</p></div>
                <ObjectCreator activeObjects={activeObjects} setActiveObjects={setActiveObjects} stageDimensions={stageDimensions}/>          
                  
            </div>
        </div>
    );
}

