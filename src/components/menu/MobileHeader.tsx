// components/MobileHeader.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import ThemeSwitcher from "@@/ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function MobileHeader() {
  const { darkMode } = useTheme();
  const [showPopover, setShowPopover] = useState(false);
  const { data: session, status } = useSession();

  // Toggle user login status (for demonstration)
  const handleLogin = () => {
    if (session) {
      signOut({ redirect: true, redirectTo: "/auth/signin" });
    } else {
      window.location.href = "/auth/signin";
    }
  };

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 min-h-[65px] border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between min-h-[40px]">
        {/* Logo */}
        <Link className="flex items-center" href="/">
          <Image
            src={darkMode ? "/images/logo-white.png" : "/images/logo-black.png"}
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
            Leave It
          </span>
        </Link>

        {/* Right Side - Theme & User */}
        <div className="flex items-center space-x-2">
          {/* Popover */}
          {showPopover && (
            <div
              className="absolute right-[10px] top-[65px] mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 p-3"
              onClick={() => setShowPopover(false)}
            >
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                Hello, {session?.user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Assigned Role: {session?.user.role}
              </p>
            </div>
          )}
          <ThemeSwitcher />
          {session ? (
            <div
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setShowPopover((prev) => !prev)}
            >
              <Image
                src={
                  darkMode
                    ? "/images/avatar-white.png"
                    : "/images/avatar-black.png"
                }
                width={24}
                height={24}
                alt="User"
                className="w-6 h-6 rounded-full"
              />
            </div>
          ) : (
            ""
          )}
          <button
            onClick={handleLogin}
            className={`flex items-center p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white`}
            title={session ? "Log out" : "Log in"}
          >
            {session ? (
              <>
                <LogOut size={20} />
              </>
            ) : (
              <>
                <LogIn size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
