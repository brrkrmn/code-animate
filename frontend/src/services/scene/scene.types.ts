import { Language } from "@/components/Editor/components/Toolbar/components/LanguageSelector";
import { Theme } from "@/components/Editor/components/Toolbar/components/ThemeSelector";
import { User } from "@/types";

export type GetUserScenesResponse = Scene[];

export type GetSceneResponse = Scene;

export type CreateSceneRequest = Partial<Scene>;

export type CreateSceneResponse = Scene;

export type EditSceneResponse = Scene;

export type EditSceneRequest = {
  title: string;
  public: boolean;
  steps: Step[];
};

export type Scene = {
  id: string;
  user: User;
  title: string;
  public: boolean;
  steps: Step[];
  createdAt: Date;
  updatedAt: Date;
  background: string;
  radius: string;
  language: Language;
  theme: Theme;
};

export type Step = {
  id: string;
  content: string;
};
