"use client";

import { useDeleteScene, useEditScene, useGetScene } from "@/hooks/useScene";
import { Scene, Step } from "@/services/scene/scene.types";
import { Extension } from "@codemirror/state";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@uiw/react-codemirror";
import { diffChars } from "diff";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Diff, SceneContextValue, Transaction } from "./sceneProvider.types";

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editorRef, setEditorRef] = useState<EditorView>();

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

  const showPreview = () => {
    setTransactions([]);
    createTransactions();
    if (editorRef) {
      resetChanges(editorRef);
      initializeChanges(editorRef);
      dispatchTransactions(editorRef);
    }
  };

  const createTransactions = () => {
    const steps = changedScene?.steps as Step[];
    for (let i = 0; i < steps.length - 1; i++) {
      const oldContent = steps[i].content;
      const newContent = steps[i + 1].content;

      const diffSet = diffChars(oldContent, newContent) as Diff[];

      let pos = 0;

      diffSet.forEach((diff) => {
        if (!diff.added && !diff.removed) {
          pos += diff.count!;
        } else if (diff.added) {
          console.log(diff);
          diff.value.split("").map((char, index) => {
            setTransactions((prev) => [
              ...prev,
              {
                from: pos + index,
                insert: char,
              },
            ]);
          });
        }
      });
    }
  };

  const dispatchTransactions = (editorView: EditorView) => {
    transactions.forEach((transaction, index) => {
      setTimeout(() => {
        editorView.dispatch({
          changes: {
            from: transaction.from,
            to: transaction.to,
            insert: transaction.insert,
          },
        });
      }, index * 100);
    });
  };

  const initializeChanges = (editorView: EditorView) => {
    editorView.dispatch({
      changes: { from: 0, insert: changedScene?.steps[0].content },
    });
  };

  const resetChanges = (editorView: EditorView) => {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.toString().length,
        insert: "",
      },
    });
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
        showPreview,
        setEditorRef,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export default SceneProvider;
