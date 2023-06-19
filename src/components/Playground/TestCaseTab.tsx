import React, { useState } from "react";
//types
import { ProblemType } from "@/types/problemSchema";

type TestCasesType = Pick<ProblemType, "tests">;


export default function TestCaseTab({ tests }: TestCasesType) {
    const [active, setActive] = useState(0);

    return (
        <div className="text-white p-4">
            <div className="mt-4">
                {tests.map((item, index) => (
                    <div
                        className={`font-medium font-light text-[14px] items-center transition-all focus:outline-none inline-flex  relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${active === index ? "text-white bg-dark-fill-2" : "text-gray-400"
                            }`}
                        key={`${item.inputs}-${index}`}
                        onClick={() => setActive(index)}
                    >
                        <p>Case {index + 1}</p>
                    </div>
                ))}
            </div>
            <div className="font-light">
                <p className="text-sm mt-4 text-white opacity-50"> Input:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                    <p className="opacity-50 text-sm mb-2">nums = </p>
                    <p>{`${tests[active].inputs}`}</p>
                </div>
            </div>
            <div className="font-light">
                <p className="text-sm  mt-4 text-white opacity-50"> Output:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                    <p>{`${tests[active].answers}`}</p>
                </div>
            </div>
        </div>
    );
}
