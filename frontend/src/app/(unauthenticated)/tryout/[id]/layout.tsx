"use client";

import SceneProvider from "@/context/scene/sceneProvider";
import { Scene } from "@/services/scene/scene.types";
import { useParams, useRouter } from "next/navigation";

const TryoutLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const scene = localStorage.getItem(id);

  const deleteScene = () => {
    localStorage.removeItem(id);
    router.push("/");
  };

  const onSave = (scene: Scene) => {
    localStorage.setItem(id, JSON.stringify(scene));
  };

  if (!scene) return null;
  return (
    <SceneProvider
      onSave={onSave}
      deleteScene={deleteScene}
      scene={JSON.parse(scene)}
    >
      {children}
    </SceneProvider>
  );
};

export default TryoutLayout;
