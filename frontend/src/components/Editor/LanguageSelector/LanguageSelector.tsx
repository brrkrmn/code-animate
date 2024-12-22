import { useSceneContext } from "@/context/scene";
import { Select, SelectItem } from "@nextui-org/react";
import { langs } from "@uiw/codemirror-extensions-langs";

export type Language = keyof typeof langs;

const LanguageSelector = () => {
  const { changedScene, updateScene } = useSceneContext();

  return (
    <Select
      disallowEmptySelection={true}
      fullWidth={false}
      size="sm"
      label="Language"
      selectedKeys={
        changedScene?.language
          ? ([changedScene.language] as Iterable<string>)
          : []
      }
      onChange={(e) => updateScene({ language: e.target.value as Language })}
    >
      {Object.keys(langs)
        .sort()
        .map((option) => (
          <SelectItem key={option}>{option}</SelectItem>
        ))}
    </Select>
  );
};

export default LanguageSelector;
