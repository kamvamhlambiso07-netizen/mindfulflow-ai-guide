import { createFileRoute, redirect, Outlet, useLocation, Navigate } from "@tanstack/react-router";
import { useUser } from "@/contexts/UserContext";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isOnboardingComplete } = useUser();
  const location = useLocation();

  if (!isOnboardingComplete && !location.pathname.includes('/onboarding')) {
    return <Navigate to="/onboarding" />;
  }
  
  if (isOnboardingComplete && location.pathname.includes('/onboarding')) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}