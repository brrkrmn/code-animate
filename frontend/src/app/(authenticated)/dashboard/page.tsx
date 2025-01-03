"use client";

import { useCreateScene, useGetScenes } from "@/hooks/useScene";
import { Button } from "@nextui-org/react";
import Link from "next/link";
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
  const { data: scenes } = useGetScenes();

  const onCreate = () => {
    createMutation.mutate();
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-start justify-start gap-6 py-6">
      <div className="flex items-center justify-center gap-2">
        <Button>Sort</Button>
        <Button>Filter</Button>
        <Button onPress={onCreate}>Create Scene</Button>
      </div>
      <div className="flex flex-col items-center justify-start">
        {scenes?.map((scene) => (
          <Link href={`/${scene.id}`} key={scene.id}>
            {scene.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
