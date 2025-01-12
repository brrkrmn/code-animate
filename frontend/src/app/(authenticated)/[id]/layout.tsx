"use client";

import SceneProvider from "@/context/scene/sceneProvider";
import { useDeleteScene, useEditScene, useGetScene } from "@/hooks/useScene";
import { Scene } from "@/services/scene/scene.types";
import { useParams } from "next/navigation";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const id = params.id as string;
  const { data: scene } = useGetScene(id);
  const deleteMutation = useDeleteScene(id);
  const editMutation = useEditScene(id || "");

  const deleteScene = () => {
    deleteMutation.mutate();
  };

  const onSave = (scene: Scene) => {
    editMutation.mutate(scene);
  };

  if (!scene) return null;
  return (
    <SceneProvider onSave={onSave} deleteScene={deleteScene} scene={scene}>
      {children}
    </SceneProvider>
  );
};

export default EditorLayout;
