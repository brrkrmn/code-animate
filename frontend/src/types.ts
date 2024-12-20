import { Scene } from "./services/scene/scene.types";

export type User = {
  id: string;
  email: string;
  emailVerified: null | boolean;
  image: string;
  name: string;
  scenes: Scene[];
  updatedAt: Date;
};
