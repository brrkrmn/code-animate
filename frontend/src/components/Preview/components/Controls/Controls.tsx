import { Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiFullscreenExitLine, RiFullscreenLine } from "react-icons/ri";
import { ComponentProps } from "./Controls.types";

const Controls = ({
  onPrevStep,
  onNextStep,
  currentIndex,
  maxIndex,
  fullScreenHandle,
}: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let closeTimeoutId: NodeJS.Timeout;
    const handleOpen = () => {
      setIsOpen(true);
      closeTimeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    };

    document.addEventListener("mousemove", handleOpen);

    return () => {
      document.removeEventListener("mousemove", handleOpen);
      clearTimeout(closeTimeoutId);
    };
  }, []);

  return (
    <div
      className={`${
        isOpen ? "opacity-100" : "opacity-0"
      } transition opacity-0 hover:opacity-100 fixed bottom-10 border-small border-divider bg-content2 rounded-full h-14 w-40 flex items-center justify-between px-2 shadow-small`}
    >
      <Tooltip
        content="Previous step"
        placement="left"
        closeDelay={100}
        delay={1000}
        radius="full"
        classNames={{
          base: "mr-2 bg-content2 text-foreground-100",
        }}
      >
        <button
          onClick={onPrevStep}
          disabled={currentIndex === 0}
          className="enabled:hover:shadow-large shadow-medium disabled:shadow-none group border-small border-divider rounded-full bg-content1 p-2 transition"
        >
          <FaAngleLeft className="text-xl group-disabled:text-foreground-100 group-hover:text-foreground-50" />
        </button>
      </Tooltip>
      <button
        onClick={
          fullScreenHandle.active
            ? fullScreenHandle.exit
            : fullScreenHandle.enter
        }
        className="
       enabled:hover:shadow-large shadow-medium disabled:shadow-none group border-small border-divider rounded-lg bg-content1 p-2 transition"
      >
        {fullScreenHandle.active ? (
          <RiFullscreenExitLine className="text-xl text-foreground-100" />
        ) : (
          <RiFullscreenLine className="text-xl text-foreground-100" />
        )}
      </button>
      <Tooltip
        content="Next step"
        placement="right"
        closeDelay={100}
        delay={1000}
        radius="full"
        classNames={{
          base: "ml-2 bg-content2 text-foreground-100",
        }}
      >
        <button
          onClick={onNextStep}
          disabled={currentIndex === maxIndex}
          className="
       enabled:hover:shadow-large shadow-medium disabled:shadow-none group border-small border-divider rounded-full bg-content1 p-2 transition"
        >
          <FaAngleRight className="text-xl group-disabled:text-foreground-100 group-hover:text-foreground-50" />
        </button>
      </Tooltip>
    </div>
  );
};

export default Controls;
