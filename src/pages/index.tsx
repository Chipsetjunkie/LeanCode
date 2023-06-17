import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import Split from "react-split";
import CodeExecutionEngine from "@/utils/CodeExEngine";

//Component
import ProblemDescription from "@/components/ProblemDescription";
import CodeEditorSettings from "@/components/CodeEditorSettings";
import TestCaseConsole from "@/components/TestCaseConsole";

//Data
import Problem from "@/dataStore/problems/jumpGame";
import TestCaseConsoleFooter from "@/components/TestCaseConsoleFooter";

const CodeEditor = forwardRef(function MyInput(
  props: { starterCode: string },
  ref
) {
  const [fontSize, setFontSize] = useState<string>("16px");
  const [userCodeSnippet, setUserCodeSnippet] = useState<string>("");
  const childRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        changeFontSize: (size: "8px" | "12px" | "16px" | "20px") => {
          setFontSize(size);
        },
        getCodeSnippet: () => {
          return userCodeSnippet
        }
      };
    },
    [userCodeSnippet]
  );

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setUserCodeSnippet(value);
  }, []);

  return (
    <CodeMirror
      ref={childRef}
      value={props.starterCode}
      theme={vscodeDark}
      onChange={onChange}
      extensions={[javascript()]}
      style={{ fontSize }}
    />
  );
});

export default function Index() {
  const [results, setResults] = useState({
    loading: false,
    data: null,
    goToResults: false,
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
          <ProblemDescription problem={Problem} />
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
