"use client";

import { useDeleteScene, useEditScene, useGetScene } from "@/hooks/useScene";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const mock = {
  title: "edited scene of hotmail",
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

const Scene = () => {
  const id = usePathname();
  const { data: scene } = useGetScene(id);
  const deleteSceneMutation = useDeleteScene(id);
  const editSceneMutation = useEditScene(id, mock);

  return (
    <div>
      <div>User: {scene?.user.name}</div>
      <div>Title: {scene?.title}</div>
      <Button onPress={() => editSceneMutation.mutate()}>
        EDIT THIS SCENE
      </Button>
      <Button onPress={() => deleteSceneMutation.mutate()}>
        DELETE THIS SCENE
      </Button>
    </div>
  );
};

export default Scene;
