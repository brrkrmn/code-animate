import { useSceneContext } from "@/context/scene";
import { Input } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";

const TitleInput = () => {
  const { changedScene, updateScene } = useSceneContext();

  return (
    <div className="flex items-center gap-1">
      <Input
        id="title"
        name="title"
        type="text"
        onValueChange={(val) => updateScene({ title: val })}
        value={changedScene?.title}
        variant="bordered"
        placeholder="Untitled"
        startContent={
          <FiEdit className="text-3xl mobile:text-4xl pointer-events-none text-foreground-100" />
        }
        classNames={{
          input: [
            "text-3xl mobile:text-4xl font-bold",
            "bg-transparent",
            "text-foreground",
            "placeholder:text-foreground-100",
            "text-ellipsis",
          ],
          inputWrapper: ["h-fit", "border-none", "!cursor-text"],
        }}
      />
    </div>
  );
};

export default TitleInput;
