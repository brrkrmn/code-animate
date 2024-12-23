"use client";

import BackgroundPicker from "@/components/Editor/BackgroundPicker/BackgroundPicker";
import LanguageSelector from "@/components/Editor/LanguageSelector/LanguageSelector";
import RadiusSelector from "@/components/Editor/RadiusSelector/RadiusSelector";
import ThemeSelector, {
  Theme,
} from "@/components/Editor/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Editor/TitleInput/TitleInput";
import { useSceneContext } from "@/context/scene";
import { Step } from "@/services/scene/scene.types";
import { Button } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Scene = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    isDirty,
    saveChanges,
    extensions,
    updateScene,
    deleteScene,
    changedScene,
  } = useSceneContext();

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

  const createStep = () => {
    const id = uuidv4();
    updateScene({
      steps: [
        ...(changedScene?.steps || []),
        {
          id,
          content: changedScene?.steps?.[currentStep]?.content || "",
        } as Step,
      ],
    });
  };

  return (
    <div>
      <TitleInput />
      <div className="flex items-center justify-center gap-4">
        <ThemeSelector />
        <LanguageSelector />
        <RadiusSelector />
        <BackgroundPicker />
      </div>
      <div>Current Step {currentStep}</div>
      <Button onPress={createStep}>Create Step ++++</Button>
      {changedScene?.steps.map((step, index) => (
        <Button onPress={() => setCurrentStep(index)} key={step.id}>
          Step: {index}
        </Button>
      ))}
      <div>
        <CodeMirror
          minHeight="200px"
          className="w-full h-full"
          value={changedScene?.steps[currentStep].content}
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
    </div>
  );
};

export default Scene;
