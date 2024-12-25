"use client";

import BackgroundPicker from "@/components/Editor/BackgroundPicker/BackgroundPicker";
import LanguageSelector from "@/components/Editor/LanguageSelector/LanguageSelector";
import RadiusSelector from "@/components/Editor/RadiusSelector/RadiusSelector";
import ThemeSelector, {
  Theme,
} from "@/components/Editor/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Editor/TitleInput/TitleInput";
import Steps from "@/components/Steps/Steps";
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
      <div className="flex items-center justify-center gap-4">
        <ThemeSelector />
        <LanguageSelector />
        <RadiusSelector />
        <BackgroundPicker />
      </div>
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
    </div>
  );
};

export default Scene;
