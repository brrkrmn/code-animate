"use client";

import Loading from "@/components/Loading/Loading";
import sceneService from "@/services/scene/scene";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

const Scene = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = usePathname();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["scene"],
    queryFn: () => sceneService.getScene(id),
  });

  const mutation = useMutation({
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

  if (isPending) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>User: {data.user.name}</div>
      <div>Title: {data.title}</div>
      <Button onPress={() => mutation.mutate()}>DELETE THIS SCENE</Button>
    </div>
  );
};

export default Scene;
