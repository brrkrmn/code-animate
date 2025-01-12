export type ComponentProps = {
  onPrevStep: () => void;
  onNextStep: () => void;
  currentIndex: number;
  maxIndex: number;
};
