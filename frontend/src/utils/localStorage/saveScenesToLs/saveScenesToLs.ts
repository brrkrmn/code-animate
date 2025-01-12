import { Scene } from "@/services/scene/scene.types";

const saveScenesToLs = (scenes: Scene[] | Partial<Scene>[]) => {
  localStorage.setItem("codymate-scenes", JSON.stringify(scenes));
};

export default saveScenesToLs;
