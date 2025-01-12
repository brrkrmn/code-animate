"use client";

import SceneProvider from "@/context/scene/sceneProvider";
import { useParams } from "next/navigation";

const TryoutLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const id = params.id as string;

  const scene = localStorage.getItem(id);

  if (!scene) return null;
  return (
    <div className="px-2 tablet:px-4 laptop:px-40 w-full max-w-[1600px]">
      <SceneProvider scene={JSON.parse(scene)}>{children} </SceneProvider>;
    </div>
  );
};

export default TryoutLayout;
