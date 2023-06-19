//TODO optimise render

import React, { useEffect, useState } from "react";

//component
import TestCaseTab from "./TestCaseTab";
import TestCaseResultTab from "./TestCaseResultTab";

//types
import { ProblemType } from "@/types/problemSchema";
import { CodeExecutionReturnType } from "@/utils/CodeExEngine";

type ResultsType = CodeExecutionReturnType;

interface TestCaseConsoleProps {
    results: null | ResultsType;
    testCases: ProblemType["tests"];
    goToResults?: boolean;
    resetGotToResults: () => void;
}

export default function TestCaseConsole({
    results = null,
    testCases,
    goToResults,
    resetGotToResults
}: TestCaseConsoleProps) {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (goToResults) {
            setActiveTab(1)
            resetGotToResults()
        }
    }, [goToResults])


    return (
        <div className="overflow-y-scroll flex flex-col grow">
            {/* Console Tab */}
            <div className=" w-full bg-[#303030] text-white text-sm p-2 px-4">
                <span
                    onClick={() => setActiveTab(0)}
                    className={`mr-6 cursor-pointer ${activeTab === 0 ? "pb-2 border-b-2 border-white" : "opacity-50"
                        }`}
                >
                    TestCases
                </span>
                {results && (
                    <span
                        onClick={() => setActiveTab(1)}
                        className={`cursor-pointer ${activeTab === 1 ? "pb-2 border-b-2 border-white" : "opacity-50"
                            }`}
                    >
                        Results
                    </span>
                )}
            </div>
            {/* Console content */}
            <div>
                {activeTab === 0 ? (
                    <TestCaseTab tests={testCases.slice(0, 2)} />
                ) : (
                    <TestCaseResultTab results={results as ResultsType} />
                )}
            </div>


        </div>
    );
}

