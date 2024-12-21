import { Scene } from "@/services/scene/scene.types";

export type SceneContextValue = null | {
  isDirty: boolean;
  changedScene: Scene | undefined;
  saveChanges: () => void;
  updateScene: (value: Partial<Scene>) => void;
  deleteScene: () => void;
};
