import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { AuthState } from "./hooks/use-auth";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { 
      queryClient,
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
      } as AuthState, // default values, overridden in __root
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
