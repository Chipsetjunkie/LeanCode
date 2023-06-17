import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import Split from 'react-split'

//Component
import ProblemDescription from '@/components/ProblemDescription';
import CodeEditorSettings from '@/components/CodeEditorSettings';
import TestCaseConsole from '@/components/TestCaseConsole';


//Data
import Problem from '@/dataStore/problems/jumpGame';




const CodeEditor = forwardRef(function MyInput(props, ref) {
  const [fontSize, setFontSize] = useState<string>("16px")
  const childRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      changeFontSize: (size: "8px" | "12px" | "16px" | "20px") => {
        setFontSize(size)
        console.log(ref, "asdasd")
      }
    };
  }, []);



  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log('value:', value);
  }, [])

  return (

    <CodeMirror
      ref={childRef}
      value="console.log('hello world!');"
      theme={vscodeDark}
      onChange={onChange}
      extensions={[javascript()]}
      style={{ fontSize }}
    />
  );
})





export default function Index() {

  const editorRef = useRef<any>(null)

  function runCode() {
    const a = new Function("a", "b", "console.log(a,b); return a+b;")
    a(1, 2)
  }

  function ChangeFont() {
    console.log("entere")
    editorRef?.current?.changeFontSize("20px")
  }

  return (
    <div >
      <Split
        sizes={[30, 70]}
        minSize={0}
        className="split"
      >

        <div className='bg-[#282828]'>
          <ProblemDescription problem={Problem} />
        </div>
        <div className='flex flex-col'>
          <CodeEditorSettings changeFont={ChangeFont} />
          <Split
            className='h-[100vh]'
            sizes={[60, 40]}
            minSize={60}
            direction='vertical'
          >
            <div className="w-full overflow-auto bg-[#282828]">
              <CodeEditor ref={editorRef} />
            </div>
            <div className='bg-[#282828] overflow-auto'>
              <TestCaseConsole testCases={Problem.tests} results={null} />
            </div>
          </Split>
        </div>
      </Split>
    </div>
  )
}
