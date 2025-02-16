"use client";

import Editor from "@/components/Editor/Editor";
import SceneProvider from "@/context/scene/sceneProvider";
import { useDeleteScene, useEditScene, useGetScene } from "@/hooks/useScene";
import { Scene } from "@/services/scene/scene.types";
import { notFound, useParams } from "next/navigation";

const Page = () => {
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

  if (!scene) notFound();
  return (
    <SceneProvider onSave={onSave} deleteScene={deleteScene} scene={scene}>
      <Editor />
    </SceneProvider>
  );
};

export default Page;
