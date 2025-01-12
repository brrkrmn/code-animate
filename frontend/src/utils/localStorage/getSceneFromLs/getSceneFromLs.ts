import { Scene } from "@/services/scene/scene.types";

const getSceneFromLs = (id: string) => {
  const lsData = localStorage.getItem("codymate-scenes");
  if (!lsData) return null;

  const scenes: Scene[] = JSON.parse(lsData);
  const scene = scenes.find((s) => s.id === id);
  return scene;
};

export default getSceneFromLs;
