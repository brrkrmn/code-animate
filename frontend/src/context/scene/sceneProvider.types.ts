import { Scene } from "@/services/scene/scene.types";
import { ReactCodeMirrorProps } from "@uiw/react-codemirror";

export type SceneContextValue = null | {
  isDirty: boolean;
  changedScene: Scene | undefined;
  saveChanges: () => void;
  updateScene: (value: Partial<Scene>) => void;
  deleteScene: () => void;
  extensions: Extensions;
};

export type Extensions = ReactCodeMirrorProps["extensions"];
