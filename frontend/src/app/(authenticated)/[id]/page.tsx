"use client";

import Preview from "@/components/Preview/Preview";
import Steps from "@/components/Steps/Steps";
import { Theme } from "@/components/Toolbar/components/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Toolbar/components/TitleInput/TitleInput";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useSceneContext } from "@/context/scene";
import { Button } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback } from "react";

const Scene = () => {
  const {
    isDirty,
    saveChanges,
    extensions,
    updateScene,
    deleteScene,
    changedScene,
    currentStepNumber,
    showPreview,
  } = useSceneContext();

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
      <Preview />
    </div>
  );
};

export default Scene;
