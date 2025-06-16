// "use client";
import { useResponsive } from "@/hooks/useResponsive";
import MobileHeader from "@@/menu/MobileHeader";
import MobileFooterNav from "@@/menu/MobileFooterNav";
import Sidebar from "@@/menu/Sidebar";

interface MenuProps {
  children?: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {
  const { mobileView, desktopView, isLoaded } = useResponsive();

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
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
