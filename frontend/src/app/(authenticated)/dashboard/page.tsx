"use client";

import { useCreateScene, useGetScenes } from "@/hooks/useScene";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const id = uuidv4();

const defaultScene = {
  id: id,
  title: "Untitled",
  public: false,
  steps: [
    {
      id: "1",
      content: "first sttep",
    },
  ],
  background: "string",
  radius: "string",
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
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl ">Dashboard</h1>
        <Button
          variant="bordered"
          color="default"
          radius="full"
          size="lg"
          onPress={() => signOut()}
        >
          Log out
        </Button>
      </div>
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
