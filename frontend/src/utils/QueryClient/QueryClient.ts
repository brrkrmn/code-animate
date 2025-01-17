import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.log("Error: ", error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.log("Error: ", error);
      },
    }),
  });
