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
      >
        {themeOptions.map((item) => {
          return <SelectItem key={item} value={item} title={item} />;
        })}
      </Select>
    );
};

export default ThemeSelector;
