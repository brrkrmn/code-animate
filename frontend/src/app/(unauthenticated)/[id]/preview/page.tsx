import Preview from "@/components/Preview/Preview";
import sceneService from "@/services/scene/scene";
import { queryClient } from "@/utils/QueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";

const PreviewPage = async () => {
  const currentHeaders = await headers();
  const pathname = currentHeaders.get("x-pathname") || "Unknown Pathname";
  const id = pathname.split("/")[1];
  const qClient = queryClient();

  const scene = await qClient.fetchQuery({
    queryKey: ["scene", id],
    queryFn: () => sceneService.getScene(id),
  });

  const dehydratedState = dehydrate(qClient);

  if (!scene) return null;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Preview scene={scene} />
    </HydrationBoundary>
  );
};

export default PreviewPage;
