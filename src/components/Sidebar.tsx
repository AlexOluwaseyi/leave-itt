"use client";
import { useState } from "react";
import {
  Home,
  Settings,
  Users,
  FileText,
  Calendar,
  Mail,
  LogOut,
  LogIn,
  Menu,
  Pin,
  ChevronLeft,
  // ChevronRight,
} from "lucide-react";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/context/ThemeContext";

// Mock user data
const mockUser = {
  name: "John Doe",
  avatar: "/api/placeholder/40/40",
  loggedIn: true,
};

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [user, setUser] = useState(mockUser);
  const { darkMode } = useTheme();

  // Navigation links
  const navLinks = [
    { icon: <Home size={20} />, text: "Dashboard", href: "#0" },
    { icon: <Users size={20} />, text: "Team", href: "#1" },
    { icon: <FileText size={20} />, text: "Projects", href: "#2" },
    { icon: <Calendar size={20} />, text: "Calendar", href: "#3" },
    { icon: <Mail size={20} />, text: "Messages", href: "#4" },
    { icon: <Settings size={20} />, text: "Settings", href: "#5" },
  ];

  // Toggle user login status (for demonstration)
  const toggleLogin = () => {
    setUser((prev) => ({
      ...prev,
      loggedIn: !prev.loggedIn,
    }));
  };

  // Toggle sidebar pin
  const togglePin = () => {
    setPinned(!pinned);
    if (!pinned) {
      setCollapsed(false); // Expand when pinning
      setShowSidebar(true); // Show sidebar when pinning
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

  return (
    <div className={`flex h-screen`}>
      {/* Mobile menu button */}
      <button
        className={` fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 dark:bg-gray-800 ${
          showSidebar ? "hidden" : "block"
        }`}
        onClick={() => setShowSidebar(true)}
      >
        <Menu size={24} className="text-gray-700 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <div
        className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} ${
          collapsed && !pinned ? "w-16" : "w-64"
        } fixed h-full ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white text-gray-800"
        }   border-r border-gray-200 flex flex-col z-40`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className="flex items-center px-4 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 rounded-md flex items-center justify-center">
            <Image
              src={
                darkMode ? "/images/logo-white.png" : "/images/logo-black.png"
              }
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          {(!collapsed || pinned) && (
            <h1 className="ml-3 text-xl font-bold">Leave IT</h1>
          )}
          <div className="ml-auto flex">
            <button
              onClick={togglePin}
              className={`p-1 rounded-md transition-colors ${
                pinned ? "text-blue-500" : "text-gray-500 dark:text-gray-400"
              } hover:bg-blue-50 dark:hover:bg-gray-700 ${
                collapsed ? "hidden" : ""
              }`}
              title={pinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              <Pin size={16} className={pinned ? "rotate-45" : ""} />
            </button>

            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700 ml-1"
            >
              <ChevronLeft size={16} />
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
                    index === 0
                      ? "bg-gray-800 text-white" // Active link
                      : darkMode
                      ? "text-white hover:bg-gray-100" // Dark mode inactive links
                      : "text-gray-800 hover:bg-gray-800" // Light mode inactive links
                  }`}
                >
                  <span
                    className={`${
                      index === 0
                        ? "text-white"
                        : darkMode
                        ? "text-gray-200 group-hover:text-gray-700"
                        : "text-gray-700 group-hover:text-gray-200"
                    }`}
                  >
                    {link.icon}
                  </span>

                  {(!collapsed || pinned) && (
                    <span
                      className={`ml-3 ${
                        index === 0
                          ? "text-white"
                          : darkMode
                          ? "text-gray-200 group-hover:text-gray-700"
                          : "text-gray-700 group-hover:text-gray-200"
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
          {user.loggedIn && (
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
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    User
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
              onClick={toggleLogin}
              className={`flex items-center p-2 rounded- ${
                collapsed && !pinned ? "" : "space-x-2"
              } ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-200 hover:text-gray-900"
                  : "text-gray-700 hover:bg-gray-900 hover:text-gray-200"
              }`}
              title={user.loggedIn ? "Log out" : "Log in"}
            >
              {user.loggedIn ? (
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

        {/* Collapse toggle button */}
        {/* {pinned && (
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md"
          >
            {collapsed ? (
              <ChevronRight
                size={16}
                className="text-gray-600 dark:text-gray-300"
              />
            ) : (
              <ChevronLeft
                size={16}
                className="text-gray-600 dark:text-gray-300"
              />
            )}
          </button>
        )} */}
      </div>

      {/* Main content area with children */}
      <div
        className={`flex-1
                   ${pinned ? (collapsed ? "ml-16" : "ml-64") : "ml-0 md:ml-16"}
                   bg-gray-50 text-gray-800`}
      >
        {children}
      </div>
    </div>
  );
}
