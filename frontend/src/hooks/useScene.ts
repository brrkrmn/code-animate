"use client";

import { useToastContext } from "@/context/toast";
import { toasts } from "@/context/toast/toast.constants";
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
    staleTime: 3000,
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
  const { toast } = useToastContext();

  return useMutation({
    mutationKey: ["createScene"],
    mutationFn: (data: CreateSceneRequest) => {
      return sceneService.createScene(data);
    },
    onSuccess: (scene) => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
      router.push(`/${scene.id}`);
    },
    onError: (error) => {
      toast(toasts.createScenes.error);
      console.log(error);
    },
  });
};

export const useCreateScenes = () => {
  const queryClient = useQueryClient();
  const { toast } = useToastContext();

  return useMutation({
    mutationKey: ["createScenes"],
    mutationFn: async (scenes: CreateSceneRequest[]) => {
      const results = [];
      for (const scene of scenes) {
        try {
          const createdScene = await sceneService.createScene(scene);
          results.push(createdScene);
        } catch (error) {
          console.error("Error creating scene:", error);
        }
      }
      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
    },
    onError: (error) => {
      toast(toasts.createScenes.error);
      console.log(error);
    },
  });
};

export const useEditScene = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToastContext();

  return useMutation({
    mutationKey: ["editScene", id],
    mutationFn: (data: EditSceneRequest) => {
      return sceneService.editScene(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scene"] });
      toast(toasts.updateScene.success);
    },
    onError: (error) => {
      toast(toasts.updateScene.error);
      console.log(error);
    },
  });
};

export const useDeleteScene = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToastContext();

  return useMutation({
    mutationKey: ["deleteScene", id],
    mutationFn: () => {
      return sceneService.deleteScene(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
      router.push("/dashboard");
      toast(toasts.deleteScene.success);
    },
    onError: (error) => {
      toast(toasts.deleteScene.error);
      console.log(error);
    },
  });
};
