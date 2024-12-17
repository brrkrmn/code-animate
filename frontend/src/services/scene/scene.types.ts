import { Editor, Scene, Step } from "@/types";

export type GetUserScenesResponse = Scene[];

export type GetSceneResponse = Scene;

export type CreateSceneResponse = {
  title: string;
  steps: Step[];
  editor: Editor;
};

export type CreateSceneRequest = Scene;

export type EditSceneResponse = Scene;

export type EditSceneRequest = {
  title: string;
  steps: Step[];
  editor: Editor;
};
