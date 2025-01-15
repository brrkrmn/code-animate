import dispatchTransactions from "@/utils/dispatchTransactions/dispatchTransactions";
import { javascript } from "@codemirror/lang-javascript";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useEffect, useRef, useState } from "react";
import { EditorProps } from "./Editor.types";

const Editor = ({ editorProps }: { editorProps: EditorProps }) => {
  const [value, setValue] = useState(editorProps.value);
  const editorRef = useRef<EditorView | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const onCreate = (editorView: EditorView) => {
    editorRef.current = editorView;
    setIsEditorReady(true);
  };

  const onChange = (val: string) => setValue(val);

  const themeExt = EditorView.theme({
    "&.cm-editor": {
      outline: "none",
    },
    ".cm-scroller": {
      padding: "20px 20px",
    },
  });

  const extensions = [javascript({ jsx: true }), themeExt];

  const startDispatchCycle = () => {
    const transactions = isReversed
      ? editorProps.transactionsReversed
      : editorProps.transactions;

    if (editorRef.current) {
      dispatchTransactions(editorRef.current, transactions);

      setTimeout(() => {
        setIsReversed((prev) => !prev);
      }, transactions.length * 100 + 500);
    }
  };

  useEffect(() => {
    if (isEditorReady) {
      startDispatchCycle();
    }
  }, [isEditorReady, isReversed]);

  return (
    <div className="border-small border-divider rounded-xl bg-content2 shadow-medium">
      <CodeMirror
        value={value}
        onChange={onChange}
        onCreateEditor={onCreate}
        theme={themes.tokyoNightInit({
          settings: {
            background: "#0000000",
            selection: "#ffffff1a",
            selectionMatch: "#ffffff1a",
          },
        })}
        extensions={extensions}
        editable={false}
        width={editorProps.width}
        maxWidth={editorProps.width}
        height={editorProps.height}
        minHeight={editorProps.height}
        maxHeight={editorProps.height}
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          foldGutter: false,
        }}
      />
    </div>
  );
};
export default Editor;
