import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RouteAccess {
  [key: string]: string[]; // route: allowed roles
}

const ROUTE_ACCESS: RouteAccess = {
  "/": ["ADMIN", "MANAGER"], // Dashboard - all roles
  "/teams": ["ADMIN", "MANAGER"], // Team management
  "/history": ["ADMIN", "MANAGER", "MEMBER"], // History - all roles
  "/reports": ["ADMIN", "MANAGER"], // Reports
  "/settings": ["ADMIN"], // Settings - admin only
  "/profile": ["ADMIN", "MANAGER", "MEMBER"], // Profile - all roles
};

interface UseSessionUrlManagerProps {
  requiredRoles?: string[];
  redirectTo?: string;
  skipUrlRewrite?: boolean;
}

interface UseSessionUrlManagerReturn {
  session: any; // eslint-disable-line
  loading: boolean;
  hasAccess: boolean;
  urlUpdated: boolean;
}

export function useSessionUrlManager({
  requiredRoles,
  redirectTo = "/auth/signin", // eslint-disable-line
  skipUrlRewrite = false,
}: UseSessionUrlManagerProps = {}): UseSessionUrlManagerReturn {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [urlUpdated, setUrlUpdated] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      // Handle loading state
      if (status === "loading") {
        setLoading(true);
        return;
      }

      // Handle unauthenticated state
      if (status === "unauthenticated") {
        router.push("/auth/signin");
        return;
      }

      // Handle missing session
      if (!session?.user) {
        setLoading(false);
        setHasAccess(false);
        return;
      }

      // Determine allowed roles
      const currentPath = window.location.pathname;
      const allowedRoles = requiredRoles || ROUTE_ACCESS[currentPath] || [];

      // Check role-based access
      const userHasAccess =
        allowedRoles.length === 0 || allowedRoles.includes(session.user.role);

      if (!userHasAccess) {
        // Redirect based on user role
        const fallbackRoute = getFallbackRoute(session.user.role);
        router.push(fallbackRoute);
        return;
      }

      setHasAccess(true);

      // Skip URL rewriting if requested
      if (skipUrlRewrite) {
        setLoading(false);
        setUrlUpdated(true);
        return;
      }

      // URL rewriting logic
      const currentParams = new URLSearchParams(window.location.search);
      let needsUrlUpdate = false;

      // Add user ID
      if (!currentParams.get("id") && session.user.id) {
        currentParams.set("id", session.user.id);
        needsUrlUpdate = true;
      }

      // Add user role
      if (!currentParams.get("role") && session.user.role) {
        currentParams.set("role", session.user.role.toLowerCase());
        needsUrlUpdate = true;
      }

      // Add session timestamp for cache busting
      if (!currentParams.get("session")) {
        currentParams.set("session", Date.now().toString());
        needsUrlUpdate = true;
      }

      // Update URL if needed
      if (needsUrlUpdate) {
        const newUrl = `${
          window.location.pathname
        }?${currentParams.toString()}`;
        window.history.replaceState({}, "", newUrl);
      }

      setUrlUpdated(true);
      setLoading(false);
    };

    if (!urlUpdated || status !== "loading") {
      initializeSession();
    }
  }, [session, status, router, urlUpdated, requiredRoles, skipUrlRewrite]);

  return {
    session,
    loading,
    hasAccess,
    urlUpdated,
  };
}

// Helper function to determine fallback route based on user role
function getFallbackRoute(userRole: string): string {
  switch (userRole) {
    case "ADMIN":
      return "/"; // Dashboard
    case "MANAGER":
      return "/"; // Dashboard
    case "MEMBER":
      return "/"; // Dashboard (members can access dashboard)
    default:
      return "/auth/signin";
  }
}

// Helper function to check if user can access a specific route
export function canAccessRoute(userRole: string, route: string): boolean {
  const allowedRoles = ROUTE_ACCESS[route];
  return !allowedRoles || allowedRoles.includes(userRole);
}

// Helper function to get accessible routes for a user role
export function getAccessibleRoutes(userRole: string): string[] {
  return Object.keys(ROUTE_ACCESS).filter((route) =>
    canAccessRoute(userRole, route)
  );
}
