import ScenesProvider from "@/context/scenes/scenesProvider";
import sceneService from "@/services/scene/scene";
import { queryClient } from "@/utils/QueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Page from "./components/Page/Page";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  const qClient = queryClient();
  await qClient.fetchQuery({
    queryKey: ["scenes"],
    queryFn: sceneService.getUserScenes,
  });

  const dehydratedState = dehydrate(qClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ScenesProvider>
        <Page />
      </ScenesProvider>
    </HydrationBoundary>
  );
};

export default Dashboard;
