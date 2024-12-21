import { useSceneContext } from "@/context/scene";
import { Radio, RadioGroup } from "@nextui-org/react";
import { radiusList } from "./constants";

const RadiusSelector = () => {
  const { changedScene, updateScene } = useSceneContext();

  return (
    <RadioGroup
      value={changedScene?.radius}
      onValueChange={(val) => updateScene({ radius: val })}
      size="lg"
      label="Radius"
      orientation="horizontal"
      classNames={{
        base: "flex-row items-center justify-between h-full px-2 shrink-0 border-small rounded-xl bg-content2 border-divider",
        wrapper: "gap-4",
        label: "text-foreground-100 text-xs font-semibold m-0",
      }}
    >
      {radiusList.map((radius) => (
        <Radio
          key={radius.value}
          value={radius.value}
          classNames={{
            base: "flex items-center justify-center p-0 h-10 max-w-10 w-10",
            wrapper: "border-0 hidden p-0",
            labelWrapper: `m-0 w-8 h-8 flex flex-row items-center justify-center group-data-[hover=true]:bg-content2 transition rounded-lg *:text-2xl *:text-foreground-50 group-data-[selected=true]:shadow-medium group-data-[selected=true]:bg-content2 group-data-[hover=true]:shadow-small`,
            control: "hidden",
          }}
        >
          <radius.children />
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default RadiusSelector;
