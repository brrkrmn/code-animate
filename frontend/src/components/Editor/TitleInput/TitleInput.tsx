import { useSceneContext } from "@/context/scene";
import { Input } from "@nextui-org/react";

const TitleInput = () => {
  const { changedScene, updateScene } = useSceneContext();

  return (
    <div>
      <Input
        id="title"
        name="title"
        type="text"
        onValueChange={(val) => updateScene({ title: val })}
        value={changedScene?.title}
      />
    </div>
  );
};

export default TitleInput;
