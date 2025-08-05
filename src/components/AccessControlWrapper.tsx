import React from "react";
import { useSessionUrlManager } from "@/hooks/useSessionUrlManager";
import Loading from "@/components/Loading";
// import { useRouter } from "next/navigation";

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
  const { loading } = useSessionUrlManager({
    requiredRoles,
    redirectTo,
    skipUrlRewrite,
  });

  // Show loading state
  if (loading) {
    return <Loading />;
  }

  return <div>{children}</div>;
}
