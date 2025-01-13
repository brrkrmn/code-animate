export type ToastContextValue = null | {
  toast: (value: { title: string; color: string }) => void;
};
