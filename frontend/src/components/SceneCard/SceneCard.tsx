import { Scene } from "@/services/scene/scene.types";
import formatDate from "@/utils/formatDate/formatDate";
import { Chip } from "@nextui-org/react";
import { langs } from "@uiw/codemirror-extensions-langs";
import { vscodeDarkInit } from "@uiw/codemirror-themes-all";
import ReactCodeMirror from "@uiw/react-codemirror";
import Link from "next/link";

const SceneCard = ({ scene }: { scene: Scene }) => {
  return (
    <Link
      className="relative group flex items-start justify-between w-full tablet:w-[48%] rounded-3xl h-32 border-small border-divider bg-content1 transition hover:shadow-large"
      href={`/${scene.id}`}
    >
      <div className="w-full h-full basis-3/5 px-5 py-3 flex flex-col justify-between">
        <p className="text-xl gradientText opacity-80 transition group-hover:opacity-100">
          {scene.title}
        </p>
        <p className="rounded-full text-sm mb-auto text-foreground-100 group-hover:text-foreground transition">
          {formatDate(scene.createdAt)}
        </p>
        <div className="absolute z-10 w-full flex gap-2 bottom-3">
          <Chip
            radius="full"
            variant="bordered"
            classNames={{
              base: "gradientBorder h-fit bg-[#3f2c0dc4] text-sm text-foreground-100 group-hover:text-foreground transition",
            }}
          >
            {scene.language}
          </Chip>
          <Chip
            radius="full"
            variant="bordered"
            classNames={{
              base: "gradientBorder h-fit bg-[#25070fc1] text-sm text-foreground-100 group-hover:text-foreground transition",
            }}
          >
            {typeof scene.theme === "string" ? scene.theme : "Custom Theme"}
          </Chip>
        </div>
      </div>
      <div className="w-full basis-2/5 h-full overflow-hidden transition opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0">
        <ReactCodeMirror
          value={scene.steps[scene.steps.length - 1].content}
          editable={false}
          width="100%"
          theme={vscodeDarkInit({
            settings: {
              background: "#0000000",
              fontSize: "10px",
            },
          })}
          extensions={[langs[scene.language]()]}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLine: false,
          }}
        />
      </div>
    </Link>
  );
};

export default SceneCard;
