"use client";

import { Scene } from "@/services/scene/scene.types";
import { Extension } from "@codemirror/state";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@uiw/react-codemirror";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToastContext } from "../toast";
import { toasts } from "../toast/toast.constants";
import { SceneContextValue } from "./sceneProvider.types";

export const SceneContext = createContext<SceneContextValue>(null);

export const useSceneContext = () => {
  const context = useContext(SceneContext);
  if (context === null) {
    throw new Error("You can only call this hook inside SceneProvider.");
  }
  return context;
};

const SceneProvider = ({
  children,
  scene,
  deleteScene,
  onSave,
}: {
  children: React.ReactNode;
  scene: Scene;
  deleteScene: () => void;
  onSave: (scene: Scene) => void;
}) => {
  const [refScene, setRefScene] = useState<Scene>();
  const [changedScene, setChangedScene] = useState<Scene | undefined>();
  const [isDirty, setIsDirty] = useState(false);
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const { toast } = useToastContext();

  useEffect(() => {
    if (scene) {
      setRefScene(scene);
      setChangedScene(scene);
    }
  }, [scene]);

  useEffect(() => {
    setIsDirty(refScene !== changedScene);
  }, [changedScene, refScene]);

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
  }, [changedScene?.language, themeExt]);

  const updateScene = (scene: Partial<Scene>) => {
    setChangedScene((prev) => ({ ...prev, ...scene } as Scene));
  };

  const saveChanges = () => {
    if (!changedScene) return null;
    onSave(changedScene);
    toast(toasts.saveChanges.success);
  };

  const onDelete = () => {
    deleteScene();
    toast(toasts.deleteScene.success);
  };

  return (
    <SceneContext.Provider
      value={{
        isDirty,
        changedScene,
        saveChanges,
        updateScene,
        onDelete,
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
