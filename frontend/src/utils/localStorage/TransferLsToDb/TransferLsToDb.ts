import { useCreateScene } from "@/hooks/useScene";
import { Scene } from "@/services/scene/scene.types";

const TransferLsToDb = () => {
  const lsData = localStorage.getItem("codymate-scenes");
  const createMutation = useCreateScene();

  if (!lsData) return null;
  const scenes: Scene[] = JSON.parse(lsData);

  scenes.forEach((scene) => createMutation.mutate(scene));
  localStorage.removeItem("codymate-scenes");
};

export default TransferLsToDb;
