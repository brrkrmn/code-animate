export type SceneContextValue = null | {
  isDirty: boolean;
  saveChanges: () => void;
};
