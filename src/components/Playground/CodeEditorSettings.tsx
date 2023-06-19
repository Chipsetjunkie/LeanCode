import React, { useState, useEffect } from 'react'
import {
    AiOutlineSetting,
    AiOutlineFullscreen,
    AiOutlineFullscreenExit,
} from "react-icons/ai";


export default function CodeEditorSettings(props: any) {

    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    useEffect(() => {
        function exitHandler() {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
                return;
            }
            setIsFullscreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener("fullscreenchange", exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            document.addEventListener("MSfullscreenchange", exitHandler);
        }

        return () => {
            document.removeEventListener("fullscreenchange", exitHandler);
            document.removeEventListener("webkitfullscreenchange", exitHandler);
            document.removeEventListener("mozfullscreenchange", exitHandler);
            document.removeEventListener("MSfullscreenchange", exitHandler);
        }
    }, []);

    return (
        <div className='bg-dark-layer-2 flex h-10  justify-between items-center text-white' >
            <p className='bg-[#282828] p-1 px-2 rounded text-[12px]'> Javascript </p>
            <div className="flex">
                <div onClick={handleFullscreen}>
                    {isFullscreen ? <AiOutlineFullscreenExit className="mr-4 cursor-pointer" /> : <AiOutlineFullscreen className="mr-4 cursor-pointer" />}
                </div>
            </div>
        </div>
    )
}
