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
      classNames={{
        base: "min-w-32 tablet:w-40",
        mainWrapper: "w-32 tablet:w-40",
        label:
          "text-foreground-100 text-xs group-data-[filled=true]:text-foreground-100",
        value:
          "text-foreground-50 group-data-[has-value=true]:text-foreground opacity-80",
        trigger:
          "rounded-xl w-32 tablet:w-40 min-h-11 h-11 bg-transparent border-divider transition shadow-small border-small data-[hover=true]:bg-content1 data-[hover=true]:shadow-large data-[focus-visible=true]:outline-0",
        popoverContent: "bg-background p-0",
        listboxWrapper: "bg-content1 rounded-xl",
      }}
    >
      {Object.keys(langs)
        .sort()
        .map((option) => (
          <SelectItem
            classNames={{
              base: "data-[selectable=true]:focus:bg-content2 data-[selectable=true]:focus:text-foreground-50 data-[selected=true]:border-small data-[selected=true]:border-divider data-[selected=true]:shadow-large",
            }}
            key={option}
          >
            {option}
          </SelectItem>
        ))}
    </Select>
  );
};

export default LanguageSelector;
