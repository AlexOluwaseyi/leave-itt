"use client";
import { useState } from "react";
import { LogOut, LogIn, Pin } from "lucide-react";
import Image from "next/image";
import ThemeSwitcher from "@@/ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { useSidebarPin } from "@/context/SidebarPinContext";
import { usePathname } from "next/navigation";
import { navLinks } from "@/mock";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { darkMode } = useTheme();
  const { pinned, togglePin } = useSidebarPin();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Toggle user login status (for demonstration)
  const handleLogin = () => {
    if (session) {
      signOut({ redirect: true, redirectTo: "/auth/signin" });
    } else {
      window.location.href = "/auth/signin";
    }
  };

  // Update togglePin to use context
  const handleTogglePin = () => {
    togglePin();
    if (!pinned) {
      setCollapsed(false);
      setShowSidebar(true);
    }
  };

  // Handle mouse enter/leave for auto-expand/collapse when not pinned
  const handleMouseEnter = () => {
    if (!pinned && collapsed) {
      setShowSidebar(true);
      setCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!pinned && !collapsed) {
      setCollapsed(true);
    }
  };

  // Check if current path matches link
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen`}>
      {/* Sidebar */}
      <div
        className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} ${
          collapsed && !pinned ? "w-16" : "w-64"
        } fixed h-full bg-white text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 border-r border-gray-200 flex flex-col z-50`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className="flex items-center px-4 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 rounded-md flex items-center justify-center">
            <Link href="/">
              <Image
                src={
                  darkMode ? "/images/logo-white.png" : "/images/logo-black.png"
                }
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </Link>
          </div>
          {(!collapsed || pinned) && (
            <h1 className="ml-3 text-xl font-bold">LEAVE IT</h1>
          )}
          <div className="ml-auto flex">
            <button
              onClick={handleTogglePin}
              className={`p-1 rounded-md transition-colors ${
                pinned ? "text-blue-500" : "text-gray-500 dark:text-gray-400"
              } hover:bg-blue-50 dark:hover:bg-gray-700 ${
                collapsed ? "hidden" : ""
              }`}
              title={pinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              <Pin size={16} className={pinned ? "rotate-45" : ""} />
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className={`group flex items-center p-2 rounded-md ${
                    isActive(link.href)
                      ? "bg-gray-800 text-white" // Active link
                      : "text-gray-800 hover:bg-gray-800 dark:text-white dark:hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`${
                      isActive(link.href)
                        ? "text-white"
                        : "dark:text-gray-200 dark:group-hover:text-gray-700 text-gray-700 group-hover:text-gray-200"
                    }`}
                  >
                    <link.icon size={20} />
                  </span>

                  {(!collapsed || pinned) && (
                    <span
                      className={`ml-3 ${
                        isActive(link.href)
                          ? "text-white"
                          : "dark:text-gray-200 dark:group-hover:text-gray-700 text-gray-700 group-hover:text-gray-200"
                      }`}
                    >
                      {link.text}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {/* User info when logged in */}
          {session && (
            <div
              className={`flex items-center mb-4 ${
                collapsed && !pinned ? "justify-center" : ""
              }`}
            >
              <Image
                src={
                  darkMode
                    ? "/images/avatar-white.png"
                    : "/images/avatar-black.png"
                }
                width={40}
                height={40}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              {(!collapsed || pinned) && (
                <div className="ml-3">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {session.user.role}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Theme toggle and login/logout */}
          <div
            className={`flex ${
              collapsed && !pinned
                ? "flex-col items-center space-y-4"
                : "justify-between items-center"
            }`}
          >
            <ThemeSwitcher
              collapsed={collapsed}
              className={`${
                collapsed && !pinned ? "justify-center" : "justify-start"
              } `}
            />

            <button
              onClick={handleLogin}
              className={`flex items-center p-2 rounded-md dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white ${
                collapsed && !pinned ? "" : "space-x-2"
              }`}
              title={session?.user ? "Log out" : "Log in"}
            >
              {session ? (
                <>
                  <LogOut size={20} />
                  {(!collapsed || pinned) && <span>Logout</span>}
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  {(!collapsed || pinned) && <span>Login</span>}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content area with children */}
      <div
        className={`flex-1
                   ${pinned ? (collapsed ? "ml-16" : "ml-64") : "ml-0 md:ml-16"}
                   dark:bg-gray-900 bg-white`}
      >
        {children}
      </div>
    </div>
  );
}
