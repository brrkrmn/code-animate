"use client";

import SceneProvider from "@/context/scene/sceneProvider";
import { useGetScene } from "@/hooks/useScene";
import { useParams } from "next/navigation";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const id = params.id as string;
  const { data: scene } = useGetScene(id);

  if (!scene) return null;
  return <SceneProvider scene={scene}>{children}</SceneProvider>;
};

export default EditorLayout;
