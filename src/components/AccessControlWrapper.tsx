import React from "react";
import { useSessionUrlManager } from "@/hooks/useSessionUrlManager";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

interface AccessControlWrapperProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
  skipUrlRewrite?: boolean;
}

export default function AccessControlWrapper({
  children,
  requiredRoles,
  redirectTo,
  skipUrlRewrite = false,
}: AccessControlWrapperProps) {
  const router = useRouter();
  const { session, loading, hasAccess } = useSessionUrlManager({
    requiredRoles,
    redirectTo,
    skipUrlRewrite,
  });

  // Show loading state
  if (loading) {
    return <Loading />;
  }

  // Show access denied if no session
  if (!session) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to be logged in to access this page.
          </p>
          <button
            onClick={() => router.push("/auth/signin")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show access denied if user doesn't have required permissions
  if (!hasAccess) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Insufficient Permissions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don&apos;t have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Your role: {session?.user.role}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}
