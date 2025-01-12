"use client";

import sceneService from "@/services/scene/scene";
import {
  CreateSceneRequest,
  EditSceneRequest,
} from "@/services/scene/scene.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetScenes = () => {
  return useQuery({
    queryKey: ["scenes"],
    queryFn: sceneService.getUserScenes,
  });
};

export const useGetScene = (id: string) => {
  return useQuery({
    queryKey: ["scene", id],
    queryFn: () => sceneService.getScene(id),
    enabled: id !== "dashboard",
  });
};

export const useCreateScene = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createScene"],
    mutationFn: (data: CreateSceneRequest) => {
      return sceneService.createScene(data);
    },
    onSuccess: (scene) => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
      router.push(`/${scene.id}`);
    },
  });
};

export const useEditScene = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editScene", id],
    mutationFn: (data: EditSceneRequest) => {
      return sceneService.editScene(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scene"] });
    },
  });
};

export const useDeleteScene = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteScene", id],
    mutationFn: () => {
      return sceneService.deleteScene(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
      router.push("/dashboard");
    },
  });
};
