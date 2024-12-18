"use client";

import Loading from "@/components/Loading/Loading";
import sceneService from "@/services/scene/scene";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

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
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = usePathname();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["scene"],
    queryFn: () => sceneService.getScene(id),
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteScene"],
    mutationFn: () => {
      return sceneService.deleteScene(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  const editMutation = useMutation({
    mutationKey: ["editScene"],
    mutationFn: () => {
      return sceneService.editScene(id, mock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scene"] });
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  if (isPending) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>User: {data.user.name}</div>
      <div>Title: {data.title}</div>
      <Button onPress={() => editMutation.mutate()}>EDIT THIS SCENE</Button>
      <Button onPress={() => deleteMutation.mutate()}>DELETE THIS SCENE</Button>
    </div>
  );
};

export default Scene;
