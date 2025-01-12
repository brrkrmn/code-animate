import { Theme } from "@/components/Editor/components/Toolbar/components/ThemeSelector/ThemeSelector";
import { Extension } from "@codemirror/state";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useMemo, useState } from "react";
import { PreviewEditorProps } from "./PreviewEditor.types";

const PreviewEditor = ({
  theme,
  radius,
  lang,
  onCreate,
  initialValue,
}: PreviewEditorProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (val: string) => setValue(val);

  const themeExt = useMemo(
    () =>
      EditorView.theme({
        "&.cm-editor": {
          outline: "none",
          borderRadius: `${radius}px`,
        },
        ".cm-scroller": {
          borderRadius: `${radius}px`,
          padding: "20px 20px",
        },
        ".cm-line": {
          borderRadius: `${radius}px`,
        },
      }),
    [radius]
  );

  const extensions: Extension[] = useMemo(() => {
    const language = lang;
    return [langs[language ? language : "javascript"](), themeExt];
  }, [lang, themeExt]);

  return (
    <div className="w-full ">
      <CodeMirror
        value={value}
        onChange={onChange}
        onCreateEditor={onCreate}
        theme={themes[theme as keyof typeof themes] as Theme}
        extensions={extensions}
        autoFocus={true}
        editable={false}
        maxHeight="90vh"
        maxWidth="100vw"
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          foldGutter: false,
        }}
      />
    </div>
  );
};

export default PreviewEditor;
