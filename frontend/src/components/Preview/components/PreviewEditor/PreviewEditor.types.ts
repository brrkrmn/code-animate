import { Language } from "@/components/Toolbar/components/LanguageSelector";
import { Theme } from "@/components/Toolbar/components/ThemeSelector";
import { EditorView } from "@uiw/react-codemirror";

export type PreviewEditorProps = {
  radius: string;
  lang: Language;
  theme: Theme;
  onCreate: (value: EditorView) => void;
  initialValue: string;
};
