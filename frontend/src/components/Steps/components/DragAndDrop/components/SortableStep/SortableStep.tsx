import { Step } from "@/services/scene/scene.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@nextui-org/react";

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
    width: "80px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Button onPress={() => setCurrentStep(index)} size="sm">
        Step {index + 1}
      </Button>
    </div>
  );
};

export default SortableStep;
