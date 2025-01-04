import { Scene } from "@/services/scene/scene.types";

export type ScenesContextValue = null | {
  scenes: Scene[];
  filteredScenes: Scene[];
  setFilteredScenes: (value: Scene[]) => void;
};
