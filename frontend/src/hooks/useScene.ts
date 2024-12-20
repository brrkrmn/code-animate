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

export const useCreateScene = (data: CreateSceneRequest) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createScene", data],
    mutationFn: () => {
      return sceneService.createScene(data);
    },
    onSuccess: (scene) => {
      queryClient.invalidateQueries({ queryKey: ["scenes"] });
      router.push(`/${scene.id}`);
    },
  });
};

export const useEditScene = (id: string, data: EditSceneRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editScene", id, data],
    mutationFn: () => {
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
