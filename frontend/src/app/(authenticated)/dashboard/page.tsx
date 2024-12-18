"use client";

import Loading from "@/components/Loading/Loading";
import sceneService from "@/services/scene/scene";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["scenes"],
    queryFn: sceneService.getUserScenes,
  });

  const mutation = useMutation({
    mutationKey: ["createScene"],
    mutationFn: () => {
      return sceneService.createScene(mock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
    },
  });

  if (isPending) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Button onPress={() => mutation.mutate()}>Create Scene</Button>
      {data?.map((scene) => (
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
