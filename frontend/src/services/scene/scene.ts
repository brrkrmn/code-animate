import { backendService } from "@/api/api";
import { API_URLS } from "@/api/api.constants";
import {
  CreateSceneRequest,
  CreateSceneResponse,
  EditSceneRequest,
  EditSceneResponse,
  GetSceneResponse,
  GetUserScenesResponse,
} from "./scene.types";

const sceneService = {
  getUserScenes: async () => {
    console.log("yoyoyoyo");
    const response = await backendService.get<GetUserScenesResponse>(
      API_URLS.scenes.all
    );
    console.log("heyheyoheh");
    return response.data;
  },
  getScene: async (id: string) => {
    const response = await backendService.get<GetSceneResponse>(
      API_URLS.scenes.byId(id)
    );
    return response.data;
  },
  createScene: async (data: CreateSceneRequest) => {
    const response = await backendService.post<CreateSceneResponse>(
      API_URLS.scenes.all,
      data
    );
    return response.data;
  },
  deleteScene: async (id: string) => {
    const response = await backendService.delete<void>(
      API_URLS.scenes.byId(id)
    );
    return response.data;
  },
  editScene: async (id: string, data: EditSceneRequest) => {
    const response = await backendService.put<EditSceneResponse>(
      API_URLS.scenes.byId(id),
      data
    );
    return response.data;
  },
};

export default sceneService;
