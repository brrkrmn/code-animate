import { useSceneContext } from "@/context/scene";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableStep from "./components/SortableStep/SortableStep";

const DragAndDrop = () => {
  const { changedScene, updateScene, setCurrentStepNumber, currentStepNumber } =
    useSceneContext();
  const sensors = useSensors(useSensor(PointerSensor));

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={(changedScene?.steps || []).map((step) => step.id)}
        strategy={horizontalListSortingStrategy}
      >
        {changedScene?.steps.map((step, index) => (
          <SortableStep
            key={step.id}
            step={step}
            index={index}
            setCurrentStep={setCurrentStepNumber}
            isActive={currentStepNumber === index}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDrop;
