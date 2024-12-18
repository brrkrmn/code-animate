import { Editor, Scene, Step } from "@/types";

export type GetUserScenesResponse = Scene[];

export type GetSceneResponse = Scene;

export type CreateSceneRequest = {
  title: string;
  public: boolean;
  steps: Step[];
  editor: Editor;
};

export type CreateSceneResponse = Scene;

export type EditSceneResponse = Scene;

export type EditSceneRequest = {
  title: string;
  public: boolean;
  steps: Step[];
  editor: Editor;
};
