import { EditorProps } from "./components/Editor/Editor.types";

export const editorProps: EditorProps[] = [
  {
    value:
      "value={changedScene?.steps[currentStepNumber].content}\ntheme={themes[changedScene?.theme as keyof typeof themes] as Theme}",
    height: "500",
    width: "200",
  },
  {
    value:
      'const handleNextKeydown = (e: KeyboardEvent) => {\n  if (\n    e.key === "ArrowRight" &&\n    !(currentIndex === scene!.steps.length - 1)\n  ) {\n    onNextStep();\n  }\n};',
    height: "200",
    width: "100",
  },
  {
    value:
      '<Link\n  href={`${changedScene?.id}/preview`}\n  target="_blank"\n  className="text-opacity-80 transition hover:shadow-medium hover:text-opacity-100"\n>\n  <FaPlay className="text-default-300" />\n  Preview\n</Link>',
    height: "200",
    width: "200",
  },
];
