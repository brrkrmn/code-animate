"use client";

import Filter from "@/components/Filter/Filter";
import SceneCard from "@/components/SceneCard/SceneCard";
import Sort from "@/components/Sort/Sort";
import { useScenesContext } from "@/context/scenes";
import { useCreateScene } from "@/hooks/useScene";
import { FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

const id = uuidv4();
const stepId = uuidv4();

const defaultScene = {
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
  theme: "tokyoNight",
};

const Dashboard = () => {
  const createMutation = useCreateScene(defaultScene);
  const { filteredScenes } = useScenesContext();

  const onCreate = () => {
    createMutation.mutate();
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-start justify-start gap-6 py-6">
      <div className="w-full flex items-center justify-center laptop:justify-start gap-2 flex-wrap">
        <div className="flex items-center justify-center gap-2">
          <Sort />
          <Filter />
        </div>
        <button
          onClick={onCreate}
          className="flex items-center justify-center gap-2 w-fit px-5 py-1 rounded-full border-small border-divider bg-content1 text-foreground-100 hover:text-foreground-50 shadow-large transition"
        >
          <FaPlus className="w-4 h-4" />
          <p>Create Scene</p>
        </button>
      </div>
      <div className="flex items-center justify-center laptop:justify-start w-full gap-6 flex-wrap">
        {filteredScenes?.map((scene) => (
          <SceneCard key={scene.id} scene={scene} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
