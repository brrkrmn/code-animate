import { useSceneContext } from "@/context/scene";
import { Select, SelectItem } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import { ReactCodeMirrorProps } from "@uiw/react-codemirror";

export type Theme = ReactCodeMirrorProps["theme"];

const ThemeSelector = () => {
  const { changedScene, updateScene } = useSceneContext();

  const themeOptions = ["dark", "light"]
    .concat(Object.keys(themes))
    .filter((item) => typeof themes[item as keyof typeof themes] !== "function")
    .filter((item) => !/^(defaultSettings)/.test(item as keyof typeof themes))
    .filter(
      (item) =>
        !item.toLowerCase().includes("light") &&
        !item.toLowerCase().includes("dark") &&
        !item.toLowerCase().includes("style")
    );

    return (
      <Select
        fullWidth={false}
        disallowEmptySelection={true}
        size="sm"
        label="Theme"
        onChange={(e) => updateScene({ theme: e.target.value as Theme })}
        selectedKeys={
          changedScene?.theme ? ([changedScene.theme] as Iterable<string>) : []
        }
        classNames={{
          base: "min-w-32 tablet:w-40",
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
        {themeOptions.map((item) => {
          return (
            <SelectItem
              classNames={{
                base: "data-[selectable=true]:focus:bg-content2 data-[selectable=true]:focus:text-foreground-50 data-[selected=true]:border-small data-[selected=true]:border-divider data-[selected=true]:shadow-large",
              }}
              key={item}
              value={item}
              title={item}
            />
          );
        })}
      </Select>
    );
};

export default ThemeSelector;
