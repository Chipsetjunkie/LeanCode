import React, { useState } from "react";

//types
import { CodeExecutionReturnType, ErrorType } from "@/utils/CodeExEngine";

type ResultsType = CodeExecutionReturnType | ErrorType;


export default function TestCaseResultTab({ results }: { results: ResultsType }) {
    const [active, setActive] = useState(0);

    if ("error" in results) {
        return <div className=" bg-[#692C38] text-dark-pink p-3 mt-10 m-3 rounded">
            <p className="opacity-100 text-dark-pink">{results.message?.message}</p>
        </div>
    } else if (results.submitted && results.status) {
        return <div className="text-white p-4">
            <div className="mt-4">

                <div className="pb-8">
                    <p className="text-olive text-xl">
                        Congrats!!! You solved it 🎉
                    </p>
                </div>
            </div></div>
    } else {
        const lastIndex = results?.operationResults?.length - 1
        const testCaseIndex = results?.submitted ? lastIndex : active
        return (
            <div className="text-white p-4">
                <div className="mt-4">

                    <div className="pb-8">
                        <p>
                            {results.status ? <span className="text-olive text-xl"> Answer Accepted </span> : <span className="text-dark-pink text-xl"> Wrong Answer </span>}
                            <span className="ml-2 opacity-50 text-sm"> Runtime: {results.runTime} ms</span>
                        </p>
                    </div>

                    {!results?.submitted && results?.operationResults?.map((item, index) => (
                        <div
                            onClick={() => setActive(index)}
                            className={`font-medium font-light text-[14px] items-center transition-all focus:outline-none inline-flex  relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${active === index ? "text-white bg-dark-fill-2" : "text-gray-400"
                                }`}
                            key={`${item.input}-${index}`}
                        >
                            <div
                                className={`w-1 h-1 ${item.testCaseResults.status ? "bg-olive" : "bg-dark-pink"
                                    } rounded-full mr-1`}
                            />
                            <p>Case {index + 1}</p>
                        </div>
                    ))}
                </div>
                <div className="font-light">
                    <p className="text-sm mt-4 text-white opacity-50"> Input:</p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        <p className="opacity-50 text-sm mb-2">nums = </p>
                        {results?.operationResults[testCaseIndex]?.input?.inputs?.map((item: any, index: number) => (
                            <p key={`${testCaseIndex}-inputs-${index}`}>{JSON.stringify(item)}</p>
                        ))}
                    </div>
                </div>

                {!!results?.operationResults[testCaseIndex]?.testCaseResults.logs?.length && (
                    <div className="font-light">
                        <p className="text-sm  mt-4 text-white opacity-50"> stdout</p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                            {results?.operationResults[testCaseIndex]?.testCaseResults.logs?.map((item, index) => (
                                <p key={`${testCaseIndex}-logs-${index}`}>{item}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="font-light">
                    <p className="text-sm  mt-4 text-white opacity-50"> Output:</p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        <p className={`${results?.operationResults[testCaseIndex]?.testCaseResults?.status ? "text-olive" : "text-dark-pink"}`}>{`${results?.operationResults[active]?.testCaseResults?.got}`}</p>
                    </div>
                </div>

                <div className="font-light">
                    <p className="text-sm  mt-4 text-white opacity-50"> Expected:</p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        <p className="text-olive">{`${results?.operationResults[testCaseIndex]?.testCaseResults?.expected}`}</p>
                    </div>
                </div>
            </div>
        );
    }


}
