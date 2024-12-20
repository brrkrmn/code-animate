"use client";

import { useGetScene } from "@/hooks/useScene";
import { Scene } from "@/services/scene/scene.types";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { SceneContextValue } from "./sceneProvider.types";

export const SceneContext = createContext<SceneContextValue>(null);

export const useSceneContext = () => {
  const context = useContext(SceneContext);
  if (context === null) {
    throw new Error("You can only call this hook inside SceneProvider.");
  }
  return context;
};

const SceneProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { data } = useGetScene(pathname);
  const [refScene, setRefScene] = useState<Scene>();
  const [newScene, setNewScene] = useState<Scene>();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setRefScene(data);
      setNewScene(data);
    }
  }, []);

  useEffect(() => {
    setIsDirty(refScene !== newScene);
  }, [newScene]);

  return (
    <SceneContext.Provider
      value={{
        isDirty,
        setNewScene,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export default SceneProvider;
