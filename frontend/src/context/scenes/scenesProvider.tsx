"use client";

import { useGetScenes } from "@/hooks/useScene";
import { Scene } from "@/services/scene/scene.types";
import { createContext, useContext, useEffect, useState } from "react";
import { ScenesContextValue } from "./scenesProvider.types";

export const ScenesContext = createContext<ScenesContextValue>(null);

export const useScenesContext = () => {
  const context = useContext(ScenesContext);
  if (context === null) {
    throw new Error("You can only call this hook inside ScenesProvider.");
  }
  return context;
};

const ScenesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: scenes } = useGetScenes();
  const [filteredScenes, setFilteredScenes] = useState<Scene[] | []>(
    scenes || []
  );

  useEffect(() => {
    if (scenes) {
      setFilteredScenes(scenes);
    }
  }, [scenes]);

  if (scenes)
    return (
      <ScenesContext.Provider
        value={{ scenes, filteredScenes, setFilteredScenes }}
      >
        {children}
      </ScenesContext.Provider>
    );
};

export default ScenesProvider;
