"use client";

import Steps from "@/components/Steps/Steps";
import { Theme } from "@/components/Toolbar/components/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Toolbar/components/TitleInput/TitleInput";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useSceneContext } from "@/context/scene";
import { Step } from "@/services/scene/scene.types";
import { Button } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { diffChars } from "diff";
import { useCallback, useState } from "react";

export type Diff = {
  count: number;
  added: boolean;
  removed: boolean;
  value: string;
};

export type Transaction = {
  from: number;
  to?: number;
  insert: string;
};

const Scene = () => {
  const {
    isDirty,
    saveChanges,
    extensions,
    updateScene,
    deleteScene,
    changedScene,
    currentStepNumber,
  } = useSceneContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const onChange = useCallback(
    (val: string) => {
      updateScene({
        steps: (changedScene?.steps || []).map((step, index) =>
          step && index === currentStepNumber ? { ...step, content: val } : step
        ),
      });
    },
    [changedScene, currentStepNumber]
  );

  const showPreview = () => {
    setTransactions([]);
    createTransactions();
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
          setTransactions((prev) => [
            ...prev,
            {
              from: pos,
              insert: diff.value,
            },
          ]);
        }
      });
    }
  };

  return (
    <div>
      <TitleInput />
      <Toolbar />
      <div>
        <CodeMirror
          minHeight="200px"
          className="w-full h-full"
          value={changedScene?.steps[currentStepNumber].content}
          onChange={onChange}
          theme={themes[changedScene?.theme as keyof typeof themes] as Theme}
          extensions={extensions}
          autoFocus={true}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
        />
      </div>
      {isDirty && <Button onPress={saveChanges}>Save Changes</Button>}
      <Button onPress={deleteScene}>Delete Scene</Button>
      <Steps />
      <Button onPress={showPreview}>PREVIEW</Button>
    </div>
  );
};

export default Scene;
