"use client";

import Preview from "@/components/Preview/Preview";
import getSceneFromLs from "@/utils/localStorage/getSceneFromLs/getSceneFromLs";
import { useParams } from "next/navigation";

const TryOutPreviewPage = () => {
  const params = useParams();
  const id = params.id as string;

  const scene = getSceneFromLs(id);

  if (!scene) return null;
  return <Preview scene={scene} />;
};

export default TryOutPreviewPage;
