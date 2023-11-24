import { useEffect, useRef, useState } from 'react';
import { ObjectCreatorBeamer } from './ObjectCreatorBeamer';

export const BeamerDisplay = ({activeObjects, setActiveObjects}) => {

    //Declaring States
    const [projectionAspectRatio, setProjectionAspectRatio] = useState(1);
    const [fullscreen, setFullscreen] = useState(false);
    const [exitNotice, setExitNotice] = useState(false);



    // Declaring Functions
    const getScreenAspectRatio = (e) => {

        let ratio = screen.width / screen.height;
        setProjectionAspectRatio(ratio);
        
        localStorage.setItem('projectionAspectRatio',ratio);
        };

    const toggleFullScreen=()=>{
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
            setFullscreen(true);
            console.log('requestfullscreen')
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
            console.log('exitfullscreen')
        }
        }

    

    //useEffects
    useEffect(() => { getScreenAspectRatio() }, []);
    
    //event Listeners  
    useEffect(() => {
                document.body.addEventListener('fullscreenchange',getScreenAspectRatio);
                document.body.addEventListener('mouseenter',()=>{setExitNotice(true)});
                document.body.addEventListener('mouseleave',()=>{setExitNotice(false)});
            return () => {
                document.body.removeEventListener('fullscreenchange',getScreenAspectRatio);
                document.body.removeEventListener('mouseenter',()=>{setExitNotice(true)});
                document.body.removeEventListener('mouseleave',()=>{setExitNotice(false)});
            };
        }, []);

    const displayInstruction = ()=>{
        if (!fullscreen) {return(
            <>
            <div className='absolute flex flex-col flex-wrap w-full h-full p-2 justify-center justify-items-center items-center content-center '>
                <div className='bg-black drop-shadow-2xl rounded-md p-5 border-2 border-gray-900 flex flex-col flex-wrap  justify-center justify-items-center items-center content-center  '>
                <p className=' text-yellow-400 text-3xl'>Drag this window onto the beamer screen and </p>                                
                <button onClick={toggleFullScreen} className='border-2 rounded-md border-yellow-400 p-2 m-2 text-yellow-400 text-xl'>⇦ go fullscreen ⇨</button>
                <p className=' text-gray-600 text-xl'>Display settings must be:</p><p className=' text-gray-600 text-xl'>[ Multiple screens: Extend these displays. ]</p>
                </div>
            </div>
            </>
    
           )}}

    const displayExitNotice = ()=>{
        if (exitNotice&&fullscreen) {return(
            <div className='absolute  flex text-red-500 flex-wrap w-full h-full justify-end content-start'><button onClick={toggleFullScreen} className='bg-black border-red-500 rounded-md p-2 border-2'>exit fullscreen ❌</button></div>

        )}}

    return (
        <>
            <div className='bg-black h-[100vh] relative overflow-hidden'>
                <div className='absolute p-2 flex text-gray-800 flex-wrap w-full h-full justify-end content-end'><p>free version of StageBeam.live</p></div>
                <ObjectCreatorBeamer activeObjects={activeObjects}/>
                {displayInstruction()}
                {displayExitNotice()}

            </div>


        </>
    );
}