import { User } from "@/types";

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

export type Scene = {
  id: string;
  user: User;
  title: string;
  public: boolean;
  steps: Step[];
  createdAt: Date;
  updatedAt: Date;
  editor: Editor;
};

export type Step = {
  number: number;
  content: string;
};

export type Editor = {
  background: string;
  radius: string;
  language: string;
  theme: string;
  extensions: string;
};
