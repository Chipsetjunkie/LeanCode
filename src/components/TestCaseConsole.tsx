import React, { useState } from 'react'
import jumpGame from '@/dataStore/problems/jumpGame'

//types
import { ProblemType } from '@/types/problemSchema'
import { CodeExecutionReturnType } from '@/utils/CodeExEngine'


type TestCasesType = Pick<ProblemType, "tests">
type ResultsType = CodeExecutionReturnType


function TestCaseTab({ tests }: TestCasesType) {

    const [active, setActive] = useState(0)

    return <div className='text-white p-4'>
        <div className='mt-4'>
            {tests.map((item, index) => (
                <div className={`font-medium font-light text-[14px] items-center transition-all focus:outline-none inline-flex  relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${active === index
                    ? "text-white bg-dark-fill-2"
                    : "text-gray-400"
                    }`} key={`${item.inputs}-${index}`} onClick={() => setActive(index)}>
                    <p>Case {index + 1}</p>
                </div>
            ))}
        </div>
        <div className='font-light'>
            <p className="text-sm mt-4 text-white opacity-50"> Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                <p className='opacity-50 text-sm mb-2'>nums = </p>
                <p>{`${tests[active].inputs}`}</p>
            </div>
        </div>
        <div className='font-light'>
            <p className="text-sm  mt-4 text-white opacity-50"> Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                <p>{`${tests[active].answers}`}</p>
            </div>
        </div>
    </div>
}

function ResultTestCase({ results }: { results: ResultsType }) {
    const [active, setActive] = useState(0)
    return <div className='text-white p-4'>
        <div className='mt-4'>
            {results.operationResults.map((item, index) => (
                <div className={`font-medium font-light text-[14px] items-center transition-all focus:outline-none inline-flex  relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${active === index
                    ? "text-white bg-dark-fill-2"
                    : "text-gray-400"
                    }`} key={`${item}-${index}`}>
                    <div className={`w-1 h-1 bg-${item.testCaseResults.status ? "bg-olive" : "bg-dark-pink"} rounded-full mx-1`} />
                    <p>Case {index + 1}</p>
                </div>
            ))}
        </div>
        <div className='font-light'>
            <p className="text-sm mt-4 text-white opacity-50"> Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                <p className='opacity-50 text-sm mb-2'>nums = </p>
                <p>{`${results.operationResults[active].input}`}</p>
            </div>
        </div>

        {!!results.operationResults[active].logs.length && <div className='font-light'>
            <p className="text-sm  mt-4 text-white opacity-50"> stdout</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                <p>{`${results.operationResults[active].logs}`}</p>
            </div>
        </div>}

        <div className='font-light'>
            <p className="text-sm  mt-4 text-white opacity-50"> Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                <p>{`${results.operationResults[active].testCaseResults.got}`}</p>
            </div>
        </div>

        <div className='font-light'>
            <p className="text-sm  mt-4 text-white opacity-50"> Expected:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                <p>{`${results.operationResults[active].testCaseResults.expected}`}</p>
            </div>
        </div>
    </div>
}


interface TestCaseConsoleProps {
    results: null | ResultsType
    testCases: ProblemType['tests']
}


export default function TestCaseConsole({ results = null, testCases }: TestCaseConsoleProps) {
    const [activeTab, setActiveTab] = useState(0)

    return <div>
        <div className='bg-[#303030] text-white text-sm p-2 px-4'>
            <span onClick={() => setActiveTab(0)} className={` mr-6 cursor-pointer ${activeTab === 0 ? "pb-2 border-b-2 border-white" : "opacity-50"}`}> TestCases </span>
            {results && <span onClick={() => setActiveTab(1)} className={`cursor-pointer ${activeTab === 1 ? "pb-2 border-b-2 border-white" : "opacity-50"}`}> Results </span>}
        </div>
        {activeTab === 0 ? <TestCaseTab tests={testCases} /> : <ResultTestCase results={results as ResultsType} />}
    </div>



}
