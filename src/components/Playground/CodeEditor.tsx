import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
  } from "react";
  import CodeMirror from "@uiw/react-codemirror";
  import { javascript } from "@codemirror/lang-javascript";
  import { vscodeDark } from "@uiw/codemirror-theme-vscode";


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
  

  export default CodeEditor