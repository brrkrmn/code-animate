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
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type SortableStepProps = {
  step: Step;
  index: number;
  setCurrentStep: (index: number) => void;
  isActive: boolean;
};

const SortableStep = ({
  step,
  index,
  setCurrentStep,
  isActive,
}: SortableStepProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    marginBottom: "8px",
    border: isActive ? "2px solid #0072F5" : "1px solid #ddd",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Button onPress={() => setCurrentStep(index)} size="sm">
        Step {index + 1}
      </Button>
    </div>
  );
};

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
  const sensors = useSensors(useSensor(PointerSensor));

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

  const deleteStep = () => {
    updateScene({
      steps: changedScene?.steps.filter((step, index) => index !== currentStep),
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = changedScene?.steps.findIndex(
        (step) => step.id === active.id
      );
      const newIndex = changedScene?.steps.findIndex(
        (step) => step.id === over?.id
      );

      if (oldIndex !== undefined && newIndex !== undefined) {
        const updatedSteps = [...(changedScene?.steps || [])];
        const [movedStep] = updatedSteps.splice(oldIndex, 1);
        updatedSteps.splice(newIndex, 0, movedStep);

        updateScene({ steps: updatedSteps });
      }
    }
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={(changedScene?.steps || []).map((step) => step.id)}
          strategy={verticalListSortingStrategy}
        >
          {changedScene?.steps.map((step, index) => (
            <SortableStep
              key={step.id}
              step={step}
              index={index}
              setCurrentStep={setCurrentStep}
              isActive={currentStep === index}
            />
          ))}
        </SortableContext>
      </DndContext>

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
      {changedScene?.steps && changedScene.steps.length > 1 && (
        <Button onPress={deleteStep}>Delete Step</Button>
      )}
    </div>
  );
};

export default Scene;
