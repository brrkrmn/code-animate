import { Theme } from "@/components/Editor/components/Toolbar/components/ThemeSelector";
import { Scene } from "@/services/scene/scene.types";
import { v4 as uuidv4 } from "uuid";

export const createDefaultScene = () => {
  const id = uuidv4();
  const stepId = uuidv4();

  const defaultScene: Partial<Scene> = {
    id: id,
    title: "Untitled",
    public: false,
    steps: [
      {
        id: stepId,
        content:
          '<button\n  onClick={onCreate}\n  className="flex items-center justify-center gap-2 w-fit px-5 py-1 rounded-full"\n>\n  <FaPlus className="w-4 h-4" />\n  <p>Create Scene</p>\n</button>',
      },
    ],
    background: "transparent",
    radius: "10",
    language: "jsx",
    theme: "tokyoNight" as Theme,
  };

  return defaultScene;
};
