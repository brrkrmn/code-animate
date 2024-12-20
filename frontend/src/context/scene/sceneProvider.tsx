"use client";

import { useEditScene, useGetScene } from "@/hooks/useScene";
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
  const { data: scene } = useGetScene(pathname.split("/")[1]);
  const [refScene, setRefScene] = useState<Scene>();
  const [changedScene, setChangedScene] = useState<Scene>();
  const [isDirty, setIsDirty] = useState(false);
  const editMutation = useEditScene(refScene?.id || "", changedScene!);

  useEffect(() => {
    if (scene) {
      setRefScene(scene);
      setChangedScene(scene);
    }
  }, [scene]);

  useEffect(() => {
    setIsDirty(refScene !== changedScene);
  }, [changedScene]);

  const saveChanges = () => {
    editMutation.mutate();
  };

  return (
    <SceneContext.Provider
      value={{
        isDirty,
        saveChanges,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export default SceneProvider;
