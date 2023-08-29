"use client";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { MutableRefObject, useEffect, useRef, useState } from "react";

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

const MonacoEditor = ({
  initialCode,
  language,
}: {
  initialCode?: string;
  language?: string;
}): JSX.Element => {
  const { theme } = useTheme();
  const monacoEditorRef = useRef<any | null>(null);
  const editorRef = useRef<any | null>(null);
  const [code, setCode] = useState<string>(
    initialCode ?? `// Start typing your code`
  );

  const onInitializePane: MonacoOnInitializePane = (
    monacoEditorRef,
    editorRef,
    model
  ) => {
    editorRef.current.focus();
    monacoEditorRef.current.setModelMarkers(model[0], "owner", null);
  };

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
      language={language === "c++" ? "cpp" : language}
      onChange={(value: any, _event: any) => {
        setCode(value);
      }}
      onMount={(editor: any, monaco: { editor: any }) => {
        monacoEditorRef.current = monaco.editor;
        editorRef.current = editor;
      }}
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
      value={code}
      height={"90vh"}
      options={{
        fontSize: 14,
        fontLigatures: true,
        fontFamily: 'Fira Code',
        wordWrap: 'on',
        tabCompletion: 'on',
        formatOnType: true
      }}
    />
  );
};

export default MonacoEditor;
