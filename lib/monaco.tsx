"use client";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

//
// So... typings weren't working when I implemented Monaco, and we had to ship,
// so these placeholder types were put in place so tests passed... please fix
// these before going production. imo Monaco provides typings, they just didn't
// work when we tried them (VSCode wouldn't recognize them, tslint complained.)
//

export type MonacoEditorOptions = {
  stopRenderingLineAfter: number;
};

export type MonacoEditorA = MutableRefObject<any>;
export type MonacoEditorB = MutableRefObject<any>;
export type MonacoTextModal = any;

export type MonacoOnInitializePane = (
  monacoEditorRef: MonacoEditorA,
  editorRef: MonacoEditorB,
  model: MonacoTextModal
) => void;

const MonacoEditor = (): JSX.Element => {
  const { theme } = useTheme();
  const monacoEditorRef = useRef<any | null>(null);
  const editorRef = useRef<any | null>(null);
  const [code, setCode] = useState<string>(`
  // Start typing your code
`);

  const onInitializePane: MonacoOnInitializePane = (
    monacoEditorRef,
    editorRef,
    model
  ) => {
    editorRef.current.setScrollTop(1)
    editorRef.current.setPosition({
      lineNumber: 2,
      column: 0,
    })
    editorRef.current.focus()
    monacoEditorRef.current.setModelMarkers(model[0], 'owner', null)
  }

  useEffect(() => {
    if (monacoEditorRef?.current) {
      const model: any = monacoEditorRef.current.getModels();

      if (model?.length > 0) {
        onInitializePane(monacoEditorRef, editorRef, model);
      }
    }
  });

  return (
    <Editor
      language="cpp"
      onChange={(value: any, _event: any) => {
        setCode(value);
      }}
      onMount={(editor: any, monaco: { editor: any; }) => {
        monacoEditorRef.current = monaco.editor;
        editorRef.current = editor;
      }}
      theme={theme === "dark" ? "hc-black" : "vs-light"}
      value={code}
      height={"90vh"}
    />
  );
};

export default MonacoEditor;
