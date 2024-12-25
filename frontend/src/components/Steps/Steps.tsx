import { useSceneContext } from "@/context/scene";
import { Step } from "@/services/scene/scene.types";
import { Button } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";

const Steps = () => {
  const { changedScene, updateScene, currentStepNumber } = useSceneContext();

  const createStep = () => {
    const id = uuidv4();
    updateScene({
      steps: [
        ...(changedScene?.steps || []),
        {
          id,
          content: changedScene?.steps?.[currentStepNumber]?.content || "",
        } as Step,
      ],
    });
  };

  const deleteStep = () => {
    updateScene({
      steps: changedScene?.steps.filter(
        (step, index) => index !== currentStepNumber
      ),
    });
  };

  return (
    <div>
      <div>Current Step {currentStepNumber}</div>
      <Button onPress={createStep}>Create Step ++++</Button>
      <DragAndDrop />
      {changedScene?.steps && changedScene.steps.length > 1 && (
        <Button onPress={deleteStep}>Delete Step</Button>
      )}
    </div>
  );
};

export default Steps;
