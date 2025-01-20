import { FullScreenHandle } from "react-full-screen";

export type ComponentProps = {
  onPrevStep: () => void;
  onNextStep: () => void;
  currentIndex: number;
  maxIndex: number;
  fullScreenHandle: FullScreenHandle;
};
