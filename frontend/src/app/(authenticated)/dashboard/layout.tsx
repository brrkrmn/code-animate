"use client";

import { useCreateScenes } from "@/hooks/useScene";
import getScenesFromLs from "@/utils/localStorage/getScenesFromLs/getScenesFromLs";
import removeScenesFromLs from "@/utils/localStorage/removeScenesFromLs/removeScenesFromLs";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const createMutation = useCreateScenes();

  useEffect(() => {
    const scenes = getScenesFromLs();
    removeScenesFromLs();
    if (!scenes) return;
    createMutation.mutate(scenes);
  }, []);

  return children;
};

export default DashboardLayout;
