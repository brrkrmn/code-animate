"use client";

import SceneProvider from "@/context/scene/sceneProvider";
import { useToastContext } from "@/context/toast";
import { toasts } from "@/context/toast/toast.constants";
import { Scene } from "@/services/scene/scene.types";
import getSceneFromLs from "@/utils/localStorage/getSceneFromLs/getSceneFromLs";
import removeOrEditSceneInLs from "@/utils/localStorage/removeOrEditSceneInLs/removeOrEditSceneInLs";
import { useParams, useRouter } from "next/navigation";

const TryoutLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToastContext();

  const scene = getSceneFromLs(id);

  const deleteScene = () => {
    removeOrEditSceneInLs(id);
    router.push("/");
  };

  const onSave = (editedScene: Scene) => {
    removeOrEditSceneInLs(id, editedScene);
    toast(toasts.createScene.success);
  };

  if (!scene) return null;
  return (
    <SceneProvider onSave={onSave} deleteScene={deleteScene} scene={scene}>
      {children}
    </SceneProvider>
  );
};

export default TryoutLayout;
