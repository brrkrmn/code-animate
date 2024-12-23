"use client";

import BackgroundPicker from "@/components/Editor/BackgroundPicker/BackgroundPicker";
import LanguageSelector from "@/components/Editor/LanguageSelector/LanguageSelector";
import RadiusSelector from "@/components/Editor/RadiusSelector/RadiusSelector";
import ThemeSelector, {
  Theme,
} from "@/components/Editor/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Editor/TitleInput/TitleInput";
import { useSceneContext } from "@/context/scene";
import { Button } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback } from "react";

const Scene = () => {
  const currentStep = 0;
  const { isDirty, saveChanges, updateScene, deleteScene, changedScene } =
    useSceneContext();

  const onChange = useCallback(
    (val: string) => {
      updateScene({
        steps: (changedScene?.steps || []).map((step, index) =>
          step && index === currentStep ? { ...step, content: val } : step
        ),
      });
    },
    [changedScene, currentStep]
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
          value={changedScene?.steps[currentStep].content}
          onChange={onChange}
          theme={themes[changedScene?.theme as keyof typeof themes] as Theme}
          autoFocus={true}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
        />
      </div>
      {isDirty && <Button onPress={saveChanges}>Save Changes</Button>}
      <Button onPress={deleteScene}>Delete Scene</Button>
    </div>
  );
};

export default Scene;
