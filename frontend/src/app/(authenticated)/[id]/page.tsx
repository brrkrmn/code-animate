import sceneService from "@/services/scene/scene";
import { queryClient } from "@/utils/QueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import Page from "./components/Page/Page";

const Scene = async () => {
  const currentHeaders = await headers();
  const pathname = currentHeaders.get("x-pathname") || "Unknown Pathname";
  const id = pathname.split("/")[1];
  const qClient = queryClient();

  await qClient.fetchQuery({
    queryKey: ["scene", id],
    queryFn: () => sceneService.getScene(id),
  });

  const dehydratedState = dehydrate(qClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Page />
    </HydrationBoundary>
  );
};

export default Scene;
