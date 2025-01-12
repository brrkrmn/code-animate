"use client";

import Preview from "@/components/Preview/Preview";
import { useGetScene } from "@/hooks/useScene";
import { useParams } from "next/navigation";

const PreviewPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: scene } = useGetScene(id);

  if (!scene) return null;
  return <Preview scene={scene} />;
};

export default PreviewPage;
