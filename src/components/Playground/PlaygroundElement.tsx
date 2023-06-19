import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Split from "react-split";
import CodeExecutionEngine from "@/utils/CodeExEngine";

//Component
import ProblemDescription from "./ProblemDescription";
import CodeEditorSettings from "./CodeEditorSettings";
import TestCaseConsole from "./TestCaseConsole";
import CodeEditor from "./CodeEditor";

//Data
import Problem from "@/dataStore/problems/validParenthesis";
import TestCaseConsoleFooter from "@/components/Playground/TestCaseConsoleFooter";



export default function Playground() {
  const [results, setResults] = useState({
    loading: false,
    data: null,
    goToResults: false,
    completed: false
  });

  const editorRef = useRef<any>(null);
  const codexRef = useRef<any>(null);

  useEffect(() => {
    const codeEng = new CodeExecutionEngine(
      Problem.tests,
      Problem.description.starterFunctionName
    );
    codexRef.current = codeEng;
  }, []);

  function runCode(isTest: boolean) {
    const codeSnippet = editorRef.current.getCodeSnippet();

    setResults((prev) => ({
      ...prev,
      loading: true,
    }));

    if (isTest) {
      const _results = codexRef.current.execute(codeSnippet, isTest);


      setResults((prev) => ({
        data: _results,
        loading: false,
        goToResults: true,
        completed: _results?.status ? true : prev.completed
      }));
    }
  }

  function ChangeFont() {
    editorRef?.current?.changeFontSize("20px");
  }

  return (
    <div>
      <Split sizes={[30, 70]} minSize={[0, 300]} className="split h-[100vh]">
        <div className="bg-[#282828]">
          <ProblemDescription problem={Problem} completed={results.completed} />
        </div>
        <div className="flex flex-col">
          <CodeEditorSettings changeFont={ChangeFont} />
          <Split
            className="h-[calc(100vh-30px)]"
            sizes={[60, 40]}
            minSize={60}
            direction="vertical"
          >
            <div className="w-full overflow-auto bg-[#282828]">
              <CodeEditor
                ref={editorRef}
                starterCode={Problem.description.starterCode}
              />
            </div>
            <div className="bg-[#282828] flex flex-col justify-between">
              <TestCaseConsole
                testCases={Problem.tests}
                results={results.data}
                goToResults={results.goToResults}
                resetGotToResults={() =>
                  setResults((prev) => ({ ...prev, goToResults: false }))
                }
              />
              <TestCaseConsoleFooter
                runCode={(isTest) => {
                  runCode(isTest);
                }}
                loading={results.loading}
              />
            </div>
          </Split>
        </div>
      </Split>
    </div>
  );
}
