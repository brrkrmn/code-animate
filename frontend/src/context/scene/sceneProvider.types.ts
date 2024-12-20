import { Scene } from "@/services/scene/scene.types";

export type SceneContextValue = null | {
  isDirty: boolean;
  setNewScene: (value: Scene) => void;
};
