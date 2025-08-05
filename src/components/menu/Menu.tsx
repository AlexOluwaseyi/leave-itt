// "use client";
import { useResponsive } from "@/hooks/useResponsive";
import MobileHeader from "@@/menu/MobileHeader";
import MobileFooterNav from "@@/menu/MobileFooterNav";
import Sidebar from "@@/menu/Sidebar";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";

interface MenuProps {
  children?: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {
  const { mobileView, desktopView, isLoaded } = useResponsive();
  const { status } = useSession();

  if (!isLoaded || status === "loading") {
    return <Loading />;
  }

  return (
    <>
      {/* Mobile view */}
      {mobileView && (
        <>
          <MobileHeader />
          {children}
          <MobileFooterNav />
        </>
      )}
      {/* Desktop view */}
      {desktopView && <Sidebar>{children}</Sidebar>}
    </>
  );
}
