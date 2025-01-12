"use client";

import SceneProvider from "@/context/scene/sceneProvider";
import { useParams } from "next/navigation";

const TryoutLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const id = params.id as string;

  const scene = localStorage.getItem(id);

  if (!scene) return null;
  return <SceneProvider scene={JSON.parse(scene)}>{children} </SceneProvider>;
};

export default TryoutLayout;
