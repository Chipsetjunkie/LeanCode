import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';


import ProblemDescription from '@/components/ProblemDescription';
import CodeEditorSettings from '@/components/CodeEditorSettings';


import Split from 'react-split'


function PreferenceHeader() {

}



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



function TestCases() {
  return <div className='flex flex-1 grow border border-[#FF0]'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sint nostrum ratione totam distinctio officia, repudiandae voluptates eligendi, provident quibusdam possimus, a numquam? Incidunt aperiam doloribus dolor quam exercitationem dignissimos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis aliquam illum atque tenetur voluptate, asperiores ratione corporis ut corrupti? Quidem dolore optio deserunt alias nulla ea repellendus eos et obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sapiente laboriosam temporibus expedita nesciunt, labore velit fugiat unde illum tempore impedit aliquid reprehenderit, sequi quibusdam veniam ipsam voluptatibus. Alias, quis!</div>
}


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
          <ProblemDescription />
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
            <div className='border border-[#0F0] bg-white overflow-auto'>
              <TestCases />
            </div>
          </Split>
        </div>
      </Split>
    </div>
  )
}
