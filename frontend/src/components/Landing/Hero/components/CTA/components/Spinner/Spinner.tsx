import { Spinner as NextUISpinner } from "@nextui-org/react";

const Spinner = () => {
  return (
    <NextUISpinner
      size="sm"
      classNames={{
        circle1: "border-b-foreground-50",
        circle2: "border-b-foreground-50",
      }}
    />
  );
};

export default Spinner;
