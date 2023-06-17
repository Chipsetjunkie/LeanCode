import React, { useState } from "react";

//types
import { CodeExecutionReturnType } from "@/utils/CodeExEngine";

type ResultsType = CodeExecutionReturnType;

export default function TestCaseResultTab({ results }: { results: ResultsType }) {
    const [active, setActive] = useState(1);
    // console.log(results)
    return (
        <div className="text-white p-4">
            <div className="mt-4">

                {results.operationResults.map((item, index) => (
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
                    <p>{JSON.stringify(results.operationResults[active].input.inputs)}</p>
                </div>
            </div>

            {!!results?.operationResults[active]?.logs?.length && (
                <div className="font-light">
                    <p className="text-sm  mt-4 text-white opacity-50"> stdout</p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        <p>{`${results.operationResults[active].logs}`}</p>
                    </div>
                </div>
            )}

            <div className="font-light">
                <p className="text-sm  mt-4 text-white opacity-50"> Output:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                    <p className={`${results.operationResults[active].testCaseResults.status ? "text-olive" : "text-dark-pink"}`}>{`${results.operationResults[active].testCaseResults.got}`}</p>
                </div>
            </div>

            <div className="font-light">
                <p className="text-sm  mt-4 text-white opacity-50"> Expected:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                    <p className="text-olive">{`${results.operationResults[active].testCaseResults.expected}`}</p>
                </div>
            </div>
        </div>
    );
}
