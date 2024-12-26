import { Theme } from "@/components/Toolbar/components/ThemeSelector/ThemeSelector";
import { useSceneContext } from "@/context/scene";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useRef, useState } from "react";

const Preview = () => {
  const { extensions, changedScene } = useSceneContext();
  const editorRef = useRef<EditorView | null>(null);
  const [value, setValue] = useState("");

  const onCreate = (editorView: EditorView) => {
    editorRef.current = editorView;
  };

  const onChange = (val: string) => setValue(val);

  return (
    <div>
      <CodeMirror
        value={value}
        onChange={onChange}
        onCreateEditor={onCreate}
        theme={themes[changedScene?.theme as keyof typeof themes] as Theme}
        extensions={extensions}
        autoFocus={true}
        editable={false}
        minHeight="200px"
        className="w-full h-full"
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          foldGutter: false,
        }}
      />
    </div>
  );
};

export default Preview;
