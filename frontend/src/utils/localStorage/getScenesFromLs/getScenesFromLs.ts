import { Scene } from "@/services/scene/scene.types";

const getScenesFromLs = () => {
  const lsData = localStorage.getItem("codymate-scenes");
  if (!lsData) return null;

  const scenes: Scene[] = JSON.parse(lsData);
  return scenes;
};

export default getScenesFromLs;
