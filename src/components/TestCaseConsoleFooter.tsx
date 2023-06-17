import React from 'react'
import { AiOutlineLoading } from "react-icons/ai"


interface TestCaseConsoleFooterProps {
    collapsed?: boolean;
    loading?: boolean;
    runCode: (x:boolean) => void
}

export default function TestCaseConsoleFooter(props: TestCaseConsoleFooterProps) {

    return (
        <div className='bg-[#303030] pl-4 flex justify-between items-start w-full text-white p-2'>
            <div className='opacity-50 flex items-center cursor-pointer'>
                {/* <p className='mr-1 text-sm'> Console </p>
                <div>{props.collapsed ? <RxCaretUp /> : <RxCaretDown />}</div> */}
            </div>

            <div className='flex'>
                <button className='bg-[#454545] w-[80px] py-1 rounded-[4px] text-sm items-center justify-center flex' onClick={() => !props.loading && props.runCode(true)}>{!props.loading ? "Run" : <AiOutlineLoading className='animate-spin h-[20px]' />}</button>
                <button className='bg-[#2cbb5d] w-[80px] py-1 rounded-[4px] mx-4 text-sm items-center justify-center flex' onClick={() => !props.loading && props.runCode(true)}>{!props.loading ? "Submit" : <AiOutlineLoading className='animate-spin h-[20px]' />}</button>
            </div>
        </div>
    )
}
