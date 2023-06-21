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
import { getCurrentUserFromStorage } from "@/utils/DataHelper";



const CodeEditor = forwardRef(function MyInput(
  props: { starterCode: string, problemId: string },
  ref
) {
  const [fontSize, setFontSize] = useState<string>("16px");
  const [userCodeSnippet, setUserCodeSnippet] = useState<string>(props.starterCode);
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

  useEffect(() => {
    const currentUser = getCurrentUserFromStorage()
    if (currentUser) {
      setUserCodeSnippet(currentUser.solution[props.problemId] || props.starterCode)
    } else {
      setUserCodeSnippet(props.starterCode)
    }

  }, [props.problemId, props.starterCode])

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    setUserCodeSnippet(value);
  }, []);

  return (
    <CodeMirror
      ref={childRef}
      value={userCodeSnippet}
      theme={vscodeDark}
      onChange={onChange}
      extensions={[javascript()]}
      style={{ fontSize }}
    />
  );
});


export default CodeEditor