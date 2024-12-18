"use client";

import { useCreateScene, useGetScenes } from "@/hooks/useScene";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const mock = {
  title: "new scene of hotmail",
  public: false,
  steps: [
    {
      number: 1,
      content: "first sttep",
    },
  ],
  editor: {
    background: "string",
    radius: "string",
    language: "string",
    theme: "string",
    extensions: "string",
  },
};

const Dashboard = () => {
  const createSceneMutation = useCreateScene(mock);
  const { data: scenes } = useGetScenes();

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Button onPress={() => createSceneMutation.mutate()}>Create Scene</Button>
      {scenes?.map((scene) => (
        <Link href={`/${scene.id}`} key={scene.id}>
          {scene.title}
        </Link>
      ))}
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
  );
};

export default Dashboard;
