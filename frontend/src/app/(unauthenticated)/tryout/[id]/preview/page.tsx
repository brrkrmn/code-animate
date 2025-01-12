"use client";

import Preview from "@/components/Preview/Preview";
import { useParams } from "next/navigation";

const TryOutPreviewPage = () => {
  const params = useParams();
  const id = params.id as string;

  const scene = localStorage.getItem(id);

  if (!scene) return null;
  return <Preview scene={JSON.parse(scene)} />;
};

export default TryOutPreviewPage;
