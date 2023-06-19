import {
    AiOutlineSetting,
    AiOutlineFullscreen,
    AiOutlineFullscreenExit,
} from "react-icons/ai";


import React from 'react'



export default function CodeEditorSettings(props: any) {
    return (
        <div className='bg-dark-layer-2 flex h-10  justify-between items-center text-white' >
            <p className='bg-[#282828] p-1 px-2 rounded text-[12px]'> Javascript </p>
            <div className="flex">
                <AiOutlineFullscreen className="mr-4 cursor-pointer" />
                <AiOutlineSetting className="mr-4 cursor-pointer" onClick={() => props.changeFont()} />
            </div>
        </div>
    )
}
