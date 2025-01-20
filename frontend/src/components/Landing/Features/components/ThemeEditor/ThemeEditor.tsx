import { Theme } from "@/components/Editor/components/Toolbar/components/ThemeSelector";
import { javascript } from "@codemirror/lang-javascript";
import * as themes from "@uiw/codemirror-themes-all";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";

export type ComponentProps = {
  theme: Theme;
  value: string;
};

const ThemeEditor = ({ theme, value }: ComponentProps) => {
  const themeExt = EditorView.theme({
    "&.cm-editor": {
      outline: "none",
      borderRadius: "10px",
    },
    ".cm-scroller": {
      borderRadius: "10px",
      padding: "20px 20px",
    },
    ".cm-line": {
      borderRadius: "10px",
    },
  });

  return (
    <div className="rounded-xl overflow-hidden flex items-center justify-center mx-2">
      <ReactCodeMirror
        value={value}
        theme={themes[theme as keyof typeof themes] as Theme}
        width="350px"
        extensions={[javascript({ jsx: true }), themeExt]}
        height="200px"
        editable={false}
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          foldGutter: false,
        }}
      />
    </div>
  );
};

export default ThemeEditor;
