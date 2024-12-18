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

export type User = {
  id: string;
  email: string;
  emailVerified: null | boolean;
  image: string;
  name: string;
  scenes: Scene[];
  updatedAt: Date;
};