"use client";

import Loading from "@/components/Loading/Loading";
import sceneService from "@/services/scene/scene";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const Scene = () => {
  const id = usePathname();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userScene"],
    queryFn: () => sceneService.getScene(id),
  });

  if (isPending) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>User: {data.user.name}</div>
      <div>Title: {data.title}</div>
    </div>
  );
};

export default Scene;
