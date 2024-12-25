"use client";

import { useDeleteScene, useEditScene, useGetScene } from "@/hooks/useScene";
import { Scene } from "@/services/scene/scene.types";
import { Extension } from "@codemirror/state";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@uiw/react-codemirror";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
  const id: string = pathname.split("/")[1];
  const { data: scene } = useGetScene(id);
  const [refScene, setRefScene] = useState<Scene>();
  const [changedScene, setChangedScene] = useState<Scene | undefined>();
  const [isDirty, setIsDirty] = useState(false);
  const editMutation = useEditScene(id || "", changedScene!);
  const deleteMutation = useDeleteScene(id);
  const [currentStepNumber, setCurrentStepNumber] = useState(0);

  useEffect(() => {
    if (scene) {
      setRefScene(scene);
      setChangedScene(scene);
    }
  }, [scene]);

  useEffect(() => {
    setIsDirty(refScene !== changedScene);
  }, [changedScene]);

  const themeExt = EditorView.theme({
    "&.cm-editor": {
      outline: "none",
      borderRadius: `${changedScene?.radius}px`,
    },
    ".cm-scroller": {
      borderRadius: `${changedScene?.radius}px`,
      padding: "20px 20px",
    },
    ".cm-line": {
      borderRadius: `${changedScene?.radius}px`,
    },
  });

  const extensions: Extension[] = useMemo(() => {
    const language = changedScene?.language;
    return [langs[language ? language : "javascript"](), themeExt];
  }, [changedScene?.language, changedScene?.radius]);

  const updateScene = (scene: Partial<Scene>) => {
    setChangedScene((prev) => ({ ...prev, ...scene } as Scene));
  };

  const saveChanges = () => {
    editMutation.mutate();
  };

  const deleteScene = () => {
    deleteMutation.mutate();
  };

  return (
    <SceneContext.Provider
      value={{
        isDirty,
        changedScene,
        saveChanges,
        updateScene,
        deleteScene,
        extensions,
        currentStepNumber,
        setCurrentStepNumber,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export default SceneProvider;
