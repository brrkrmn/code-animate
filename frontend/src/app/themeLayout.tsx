"use client";

import { NextUIProvider } from "@nextui-org/react";

const ThemeLayout = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default ThemeLayout;
