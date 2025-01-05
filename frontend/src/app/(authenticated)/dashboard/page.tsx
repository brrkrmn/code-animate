"use client";

import Filter from "@/components/Filter/Filter";
import Sort from "@/components/Sort/Sort";
import { useScenesContext } from "@/context/scenes";
import { useCreateScene } from "@/hooks/useScene";
import Link from "next/link";
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
      content: "First step",
    },
  ],
  background:
    "linear-gradient(45deg, rgba(182,1,255,1) 0%, RGB(65, 31, 161) 49%, rgba(1,1,255,1) 100%)",
  radius: "10",
  language: "javascript",
  theme: "androidstudio",
};

const Dashboard = () => {
  const createMutation = useCreateScene(defaultScene);
  const { filteredScenes } = useScenesContext();

  const onCreate = () => {
    createMutation.mutate();
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-start justify-start gap-6 py-6">
      <div className="flex items-center justify-center gap-2 flex-wrap">
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
      <div className="flex flex-col items-center justify-start">
        {filteredScenes?.map((scene) => (
          <Link href={`/${scene.id}`} key={scene.id}>
            {scene.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
