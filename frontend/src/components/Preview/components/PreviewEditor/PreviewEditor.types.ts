import { Language } from "@/components/Editor/components/Toolbar/components/LanguageSelector";
import { Theme } from "@/components/Editor/components/Toolbar/components/ThemeSelector";
import { EditorView } from "@uiw/react-codemirror";

export type PreviewEditorProps = {
  radius: string;
  lang: Language;
  theme: Theme;
  onCreate: (value: EditorView) => void;
  setValue: (value: string) => void;
  value: string;
};
