import { Scene } from "@/services/scene/scene.types";
import saveScenesToLs from "../saveScenesToLs/saveScenesToLs";

const removeOrEditSceneInLs = (id: string, editedScene?: Scene) => {
  const lsData = localStorage.getItem("codymate-scenes");
  if (!lsData) return null;

  const scenes: Scene[] = JSON.parse(lsData);

  let newScenes;
  if (editedScene) {
    newScenes = scenes.map((s) => (s.id === id ? editedScene : s));
  } else {
    newScenes = scenes.filter((s) => s.id !== id);
  }
  saveScenesToLs(newScenes);
};

export default removeOrEditSceneInLs;
