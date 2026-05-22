import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { Navigate, useLocation, Outlet as RouterOutlet } from "@tanstack/react-router";
import { useAuth, AuthState } from "@/hooks/use-auth";
import appCss from "../styles.css?url";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createRootRouteWithContext<{ 
  queryClient: QueryClient;
  auth: AuthState;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FocusFlow AI" },
      { name: "description", content: "Habit Recovery & Productivity Assistant" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RequireOnboarding>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </RequireOnboarding>
      </UserProvider>
    </QueryClientProvider>
  );
}

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const { isOnboardingComplete } = useUser();
  const location = useLocation();

  if (!isOnboardingComplete && !location.pathname.includes('/onboarding')) {
    return <Navigate to="/onboarding" />;
  }
  
  if (location.pathname.includes('/onboarding')) {
    return <Outlet />;
  }

  return <>{children}</>;
}
