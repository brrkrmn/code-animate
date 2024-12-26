import { Scene } from "@/services/scene/scene.types";
import { EditorView, ReactCodeMirrorProps } from "@uiw/react-codemirror";

export type SceneContextValue = null | {
  isDirty: boolean;
  changedScene: Scene | undefined;
  saveChanges: () => void;
  updateScene: (value: Partial<Scene>) => void;
  deleteScene: () => void;
  extensions: Extensions;
  currentStepNumber: number;
  setCurrentStepNumber: (value: number) => void;
  showPreview: () => void;
  setEditorRef: (value: EditorView) => void;
};

export type Extensions = ReactCodeMirrorProps["extensions"];

export type Diff = {
  count: number;
  added: boolean;
  removed: boolean;
  value: string;
};

export type Transaction = {
  from: number;
  to?: number;
  insert: string;
};