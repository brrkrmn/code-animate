import { IconType } from "react-icons";
import {
  TbBorderCornerIos,
  TbBorderCornerPill,
  TbBorderCornerRounded,
  TbBorderCornerSquare,
} from "react-icons/tb";

export type Radius = {
  value: "0" | "10" | "20" | "40";
  style: string;
  children: IconType;
};
export const radiusList: Radius[] = [
  { value: "0", style: "rounded-none", children: TbBorderCornerSquare },
  { value: "10", style: "rounded-xs", children: TbBorderCornerRounded },
  { value: "20", style: "rounded-sm", children: TbBorderCornerIos },
  { value: "40", style: "rounded-lg", children: TbBorderCornerPill },
];
